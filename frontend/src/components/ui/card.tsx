import * as React from "react";

import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "section" | "div" | "article";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, as: Tag = "div", ...props }, ref) => {
    return (
      <Tag
        ref={ref}
        className={cn(
          "rounded-3xl bg-card px-6 py-5 shadow-sm shadow-slate-200/40 ring-1 ring-inset ring-border/60 transition-all duration-200 hover:shadow-md hover:ring-primary/40",
          className,
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  },
);
Card.displayName = "Card";

export const CardHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-1", className)} {...props} />
);

export const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("text-lg font-semibold text-foreground tracking-tight", className)} {...props} />
);

export const CardDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props} />
);

export const CardContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-4 flex flex-col gap-4", className)} {...props} />
);

export const CardFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-6 flex items-center justify-between", className)} {...props} />
);
