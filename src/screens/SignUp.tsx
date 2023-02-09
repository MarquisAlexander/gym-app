import { useState } from "react";
import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import LogoSvg from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignUp() {
	const [name, setName] = useState(String());
	const [email, setEmail] = useState(String());
	const [password, setPassword] = useState(String());
	const [passwordConfirm, setPasswordConfirm] = useState(String());
	2;
	const navigation = useNavigation();

	function handleGoBack() {
		navigation.goBack();
	}

	function handleSignUp() {
		console.log({
			name,
			email,
			password,
			passwordConfirm,
		});
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
						Crie sua conta
					</Heading>
				</Center>

				<Input placeholder="Nome" onChangeText={setName} />

				<Input
					placeholder="E-mail"
					keyboardType="email-address"
					autoCapitalize="none"
					onChangeText={setEmail}
				/>

				<Input placeholder="Senha" secureTextEntry onChangeText={setPassword} />
				<Input
					placeholder="Confirmar a Senha"
					secureTextEntry
					onChangeText={setPasswordConfirm}
				/>

				<Button title="Criar a acessar" onPress={handleSignUp} />

				<Button
					title="Voltar para o login"
					variant="outline"
					mt={20}
					onPress={handleGoBack}
				/>
			</VStack>
		</ScrollView>
	);
}
