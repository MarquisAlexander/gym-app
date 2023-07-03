import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import {
	Heading,
	HStack,
	Icon,
	Text,
	VStack,
	Image,
	Box,
	ScrollView,
	useToast,
} from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { AppNavigatorRoutesProps } from "@routes/app.routes";
import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg";

import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { ExerciseDTO } from "@dtos/ExercisesDTO";
import { Loading } from "@components/Loading";

type RouteParamsProps = {
	exerciseId: string;
};

export function Exercise() {
	const [isLoading, setIsLoading] = useState(true);
	const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);
	const navigation = useNavigation<AppNavigatorRoutesProps>();
	const toast = useToast();

	const route = useRoute();

	const { exerciseId } = route.params as RouteParamsProps;

	function handleGoBack() {
		navigation.goBack();
	}

	async function fetchExerciseDetails() {
		try {
			setIsLoading(true);
			const response = await api.get(`/exercises/${exerciseId}`);
			setExercise(response.data);
		} catch (error) {
			const isAppError = error instanceof AppError;
			const title = isAppError
				? error.message
				: "Não foi possível carregar os detalhes do exercícios.";

			toast.show({
				title,
				placement: "top",
				bgColor: "red.500",
			});
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		fetchExerciseDetails();
	}, [exerciseId]);

	return (
		<VStack flex={1}>
			<VStack px={8} bg="gray.600" pt={12}>
				<TouchableOpacity onPress={handleGoBack}>
					<Icon as={Feather} name="arrow-left" color="green.500" size={6} />
				</TouchableOpacity>

				<HStack
					justifyContent="space-between"
					mt={4}
					mb={8}
					alignItems="center"
				>
					<Heading
						color="gray.100"
						fontSize="lg"
						flexShrink={1}
						fontFamily="heading"
					>
						{exercise.name}
					</Heading>

					<HStack alignItems="center">
						<BodySvg />
						<Text color="gray.200" ml={1} textTransform="capitalize">
							{exercise.group}
						</Text>
					</HStack>
				</HStack>
			</VStack>
			{isLoading ? (
				<Loading />
			) : (
				<ScrollView>
					<VStack p={8}>
						<Box rounded="lg" mb={3} overflow="hidden">
							<Image
								source={{
									uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
								}}
								w="full"
								h={80}
								alt="Nome do exercício"
								resizeMode="cover"
								rounded="lg"
							/>
						</Box>

						<Box bg="gray.600" rounded="md" pb={4} px={4}>
							<HStack
								alignItems="center"
								justifyContent="space-around"
								mb={6}
								mt={5}
							>
								<HStack>
									<SeriesSvg />
									<Text color="gray.200" ml="2">
										{exercise.series} repetições
									</Text>
								</HStack>

								<HStack>
									<RepetitionsSvg />
									<Text color="gray.200" ml="2">
										{exercise.repetitions} repetições
									</Text>
								</HStack>
							</HStack>

							<Button title="Marcar como realizado" />
						</Box>
					</VStack>
				</ScrollView>
			)}
		</VStack>
	);
}
