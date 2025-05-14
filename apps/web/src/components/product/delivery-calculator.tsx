"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getWithExpiry, setWithExpiry } from "@/lib/storage";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface Address {
	cep: string;
	logradouro: string;
	bairro: string;
	localidade: string;
	uf: string;
}

const STORAGE_KEY = "delivery-cep";
const FIFTEEN_MINUTES = 15 * 60 * 1000; // 15 minutes in milliseconds

export default function DeliveryCalculator() {
	const [cep, setCep] = useState("");
	const [address, setAddress] = useState<Address | null>(null);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	// Load saved CEP on component mount
	useEffect(() => {
		const savedCep = getWithExpiry<string>(STORAGE_KEY);
		if (savedCep) {
			setCep(savedCep);
			validateCEP(savedCep);
		}
	}, []);

	const formatCEP = (value: string) => {
		// Remove any non-digit character
		const digits = value.replace(/\D/g, "");
		// Format as xxxxx-xxx
		return digits.replace(/^(\d{5})(\d{3}).*/, "$1-$2");
	};

	const handleCEPChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		const formattedCEP = formatCEP(value);
		setCep(formattedCEP.slice(0, 9)); // Limit to CEP format length
	};

	const validateCEP = async (cepToValidate: string = cep) => {
		const cleanCEP = cepToValidate.replace(/\D/g, "");
		if (cleanCEP.length !== 8) {
			setError("CEP inválido");
			setAddress(null);
			return;
		}

		setLoading(true);
		setError("");

		try {
			const response = await fetch(
				`https://viacep.com.br/ws/${cleanCEP}/json/`,
			);
			const data = await response.json();

			if (data.erro) {
				setError("CEP não encontrado");
				setAddress(null);
			} else {
				setAddress(data);
				setError("");
				// Save CEP with 15 minutes expiry
				setWithExpiry(STORAGE_KEY, cepToValidate, FIFTEEN_MINUTES);
			}
		} catch (err) {
			setError("Erro ao buscar CEP");
			setAddress(null);
		} finally {
			setLoading(false);
		}
	};

	const handleBlur = () => {
		if (cep.replace(/\D/g, "").length === 8) {
			validateCEP();
		}
	};

	return (
		<div className="space-y-4 rounded-lg border p-4">
			<div className="space-y-2">
				<Label htmlFor="cep">Calcular Frete</Label>
				<div className="flex gap-2">
					<Input
						id="cep"
						type="text"
						placeholder="Digite o CEP"
						value={cep}
						onChange={handleCEPChange}
						onBlur={handleBlur}
						maxLength={9}
						className="w-40"
					/>
					<Button>OK</Button>
				</div>
				{loading && <p className="text-gray-500 text-sm">Buscando CEP...</p>}
				{error && <p className="text-red-500 text-sm">{error}</p>}
			</div>

			{address && (
				<div className="space-y-2">
					<h4 className="font-semibold text-sm">Endereço de entrega:</h4>
					<div className="space-y-1 text-gray-600 text-sm">
						<p>{address.logradouro}</p>
						<p>{address.bairro}</p>
						<p>
							{address.localidade} - {address.uf}
						</p>
						<p className="mt-2 font-medium text-green-600">
							Frete grátis para todo o Brasil
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
