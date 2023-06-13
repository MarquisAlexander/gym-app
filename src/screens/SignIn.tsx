import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useAuth } from "@hooks/useAuth";

import LogoSvg from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Controller, useForm } from "react-hook-form";

type FormData = {
	email: string;
	password: string;
};

export function SignIn() {
	const { signIn } = useAuth();
	const navigation = useNavigation<AuthNavigatorRoutesProps>();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	function handleNewAccount() {
		navigation.navigate("signUp");
	}

	function handleSignIn({ email, password }: FormData) {
		signIn(email, password);
	}

	return (
		<ScrollView
			contentContainerStyle={{ flexGrow: 1 }}
			showsVerticalScrollIndicator={false}
		>
			<VStack flex={1} px={10} pb={16}>
				<Image
					source={BackgroundImg}
					defaultSource={BackgroundImg}
					alt="Pessoas treinando"
					resizeMode="contain"
					position="absolute"
				/>

				<Center my={24}>
					<LogoSvg />

					<Text color="gray.100" fontSize="sm">
						Treine sua mente e o seu corpo
					</Text>
				</Center>

				<Center>
					<Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
						Acesse sua conta
					</Heading>
				</Center>

				<Controller
					control={control}
					name="email"
					rules={{ required: "Informe o e-mail" }}
					render={({ field: { onChange } }) => (
						<Input
							placeholder="E-mail"
							keyboardType="email-address"
							autoCapitalize="none"
							onChangeText={onChange}
							errorMessage={errors.email?.message}
						/>
					)}
				/>

				<Controller
					control={control}
					name="password"
					rules={{ required: "Informe senha" }}
					render={({ field: { onChange } }) => (
						<Input
							placeholder="Senha"
							secureTextEntry
							onChangeText={onChange}
							errorMessage={errors.email?.message}
						/>
					)}
				/>

				<Button title="Acessar" onPress={handleSubmit(handleSignIn)} />

				<Center mt={20}>
					<Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
						Ainda não tem acesso?
					</Text>
					<Button
						title="Criar conta"
						variant="outline"
						onPress={handleNewAccount}
					/>
				</Center>
			</VStack>
		</ScrollView>
	);
}
