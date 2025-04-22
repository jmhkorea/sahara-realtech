import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
  headerClassName?: string;
  contentClassName?: string;
  toggleClassName?: string;
}

export function CollapsibleCard({
  title,
  description,
  children,
  className,
  defaultOpen = true,
  headerClassName,
  contentClassName,
  toggleClassName
}: CollapsibleCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Card className={cn("transition-all duration-300", className)}>
      <CardHeader 
        className={cn(
          "flex flex-row items-center justify-between cursor-pointer py-4",
          headerClassName
        )}
        onClick={toggleCollapse}
      >
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <div 
          className={cn(
            "p-1 rounded-full hover:bg-neutral-100 transition-colors",
            toggleClassName
          )}
        >
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-neutral-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-neutral-500" />
          )}
        </div>
      </CardHeader>
      
      <div
        className={cn(
          "transition-all duration-300 overflow-hidden",
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <CardContent className={cn("pt-0", contentClassName)}>
          {children}
        </CardContent>
      </div>
    </Card>
  );
}