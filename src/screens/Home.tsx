import { HomeHeader } from "@components/HomeHeader";
import { VStack, Center, Text } from "native-base";

export function Home() {
	return (
		<VStack flex={1}>
			<HomeHeader />
		</VStack>
	);
}
