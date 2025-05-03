import { cn } from "@/lib/utils";

type CardProps = {} & React.ComponentProps<"div">;

export default function Card({ className, children, ...props }: CardProps) {
	return (
		<div
			className={cn("bg-white p-6 lg:p-8 w-full rounded-lg", className)}
			{...props}
		>
			{children}
		</div>
	);
}
