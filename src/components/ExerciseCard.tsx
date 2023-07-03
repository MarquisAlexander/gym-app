import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Heading, HStack, Image, Text, VStack, Icon } from "native-base";
import { Entypo } from "@expo/vector-icons";

import { api } from "@services/api";
import { ExerciseDTO } from "@dtos/ExercisesDTO";

type Props = TouchableOpacityProps & {
	data: ExerciseDTO
};

export function ExerciseCard({ data, ...rest }: Props) {
	console.log(data)
	return (
		<TouchableOpacity {...rest}>
			<HStack
				bg="gray.500"
				alignItems="center"
				p={2}
				pr={4}
				rounded="md"
				mb={3}
			>
				<Image
					source={{
						uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`,
					}}
					alt="Imagem do exercício"
					w={16}
					h={16}
					rounded="md"
					mr={4}
					resizeMode="cover"
				/>

				<VStack flex={1}>
					<Heading fontSize="lg" color="white" fontFamily="heading">
						Remada unilateral
					</Heading>

					<Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
						3 séries x 12 repetições
					</Text>
				</VStack>

				<Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
			</HStack>
		</TouchableOpacity>
	);
}
