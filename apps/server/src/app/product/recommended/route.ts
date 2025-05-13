import { NextResponse } from "next/server";

export async function GET() {
    const banner = [{
  id: 1,
  name: "Camiseta Casual Moderna", 
  images: [
    "https://acdn-us.mitiendanube.com/stores/001/040/334/themes/uyuni/slide-1745017414156-2073455999-736d40ac6595583bbf06ff44f6a98b141745017417.png?945924752",
  ],
 },
 {
  id: 2,
  name: "Camiseta Casual Moderna", 
  images: [
    "https://acdn-us.mitiendanube.com/stores/001/040/334/themes/uyuni/slide-1745010399608-6184386738-74e54001bc54133cceec4962da299c521745010405.png?945924752",
  ],
 },
 ]

    return NextResponse.json({ banner });
}
