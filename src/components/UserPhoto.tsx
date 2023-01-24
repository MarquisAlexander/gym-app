import { Image, IImageProps } from "native-base";

type Props = IImageProps & {
	size: number;
};

export function UserPhoto({ size, ...props }: Props) {
	return (
		<Image
			width={size}
			height={size}
			rounded="full"
			borderWidth={2}
			borderColor="gray.400"
            {...props}
		/>
	);
}
