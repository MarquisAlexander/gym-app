import { ReactNode, createContext, useEffect, useState } from "react";
import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import {
	storageUserSave,
	storageUserGet,
	storageUserRemove,
} from "@storage/storageUser";
import {
	storageAuthTokenSave,
	storageAuthTokenGet,
	storageAuthTokenRemove,
} from "@storage/storageAuthToken";

export type AuthContextDataProps = {
	user: UserDTO;
	signIn: (email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
	isLoadingUserStorageData: boolean;
};

type AuthContextProviderProps = {
	children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
	{} as AuthContextDataProps,
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
	const [user, setUser] = useState<UserDTO>({} as UserDTO);
	const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
		useState(true);

	async function userAndTokenUpdate(userData: UserDTO, token: string) {
		api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		setUser(userData);
	}

	async function storageUserAndTokenSave(userData: UserDTO, token: string) {
		try {
			setIsLoadingUserStorageData(true);

			await storageUserSave(userData);
			await storageAuthTokenSave(token);
		} catch (error) {
		} finally {
			setIsLoadingUserStorageData(false);
		}
	}

	async function signIn(email: string, password: string) {
		try {
			setIsLoadingUserStorageData(true);

			const { data } = await api.post("/sessions", { email, password });

			if (data.user && data.token) {
				await storageUserAndTokenSave(data.user, data.token);
				userAndTokenUpdate(data.user, data.token);
			}
		} catch (error) {
			throw error;
		} finally {
			setIsLoadingUserStorageData(false);
		}
	}

	async function signOut() {
		try {
			setIsLoadingUserStorageData(true);
			setUser({} as UserDTO);

			await storageUserRemove();
			await storageAuthTokenRemove();
		} catch (error) {
			throw error;
		} finally {
			setIsLoadingUserStorageData(false);
		}
	}

	async function loadUserData() {
		try {
			setIsLoadingUserStorageData(true);

			const userLogged = await storageUserGet();
			const token = await storageAuthTokenGet();

			if (token && userLogged) {
				userAndTokenUpdate(userLogged, token);
			}
		} catch (error) {
			throw error;
		} finally {
			setIsLoadingUserStorageData(false);
		}
	}

	useEffect(() => {
		loadUserData();
	}, []);

	return (
		<AuthContext.Provider
			value={{ user, signIn, isLoadingUserStorageData, signOut }}
		>
			{children}
		</AuthContext.Provider>
	);
}
