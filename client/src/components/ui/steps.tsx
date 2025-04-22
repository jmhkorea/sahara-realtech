import React from "react";
import { cn } from "@/lib/utils";

interface StepsProps {
  children: React.ReactNode;
  currentStep: number;
  className?: string;
}

interface StepProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  status?: "pending" | "in-progress" | "complete";
  onClick?: () => void;
  className?: string;
}

export function Steps({ children, currentStep, className }: StepsProps) {
  // React.Children.toArray로 Steps 컴포넌트의 자식을 배열로 변환
  const childrenArray = React.Children.toArray(children);
  const steps = childrenArray.filter((child) => React.isValidElement(child));

  return (
    <div className={cn("flex flex-col w-full", className)}>
      {steps.map((step, index) => {
        let status: "pending" | "in-progress" | "complete";
        
        if (index < currentStep) {
          status = "complete";
        } else if (index === currentStep) {
          status = "in-progress";
        } else {
          status = "pending";
        }
        
        // React.cloneElement를 사용하여 각 Step 컴포넌트에 추가 props 전달
        return React.cloneElement(step as React.ReactElement<StepProps>, {
          status,
          key: index,
        });
      })}
    </div>
  );
}

export function Step({
  title,
  description,
  icon,
  status = "pending",
  onClick,
  className,
}: StepProps) {
  // 상태에 따른 스타일
  const getStepStateColors = () => {
    switch (status) {
      case "complete":
        return "bg-primary text-white";
      case "in-progress":
        return "bg-primary text-white";
      default:
        return "bg-neutral-200 text-neutral-600";
    }
  };

  const getLineStateColors = () => {
    switch (status) {
      case "complete":
        return "bg-primary";
      case "in-progress":
        return "bg-neutral-200";
      default:
        return "bg-neutral-200";
    }
  };

  const getTitleStateColors = () => {
    switch (status) {
      case "complete":
        return "text-primary";
      case "in-progress":
        return "text-primary font-medium";
      default:
        return "text-neutral-600";
    }
  };

  return (
    <div
      className={cn("flex w-full items-start mb-8 last:mb-0 group", className)}
      onClick={onClick}
    >
      <div className="flex flex-col items-center mr-4">
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center",
            getStepStateColors()
          )}
        >
          {status === "complete" && icon ? (
            icon
          ) : (
            <span className="text-sm font-medium">
              {icon ? icon : status === "complete" ? "✓" : ""}
            </span>
          )}
        </div>
        {/* 마지막 단계가 아닌 경우에만 선을 표시 */}
        <div
          className={cn(
            "w-0.5 h-full mt-2 mb-0 hidden last:hidden flex-grow",
            getLineStateColors()
          )}
        ></div>
      </div>
      <div className="flex-1 pb-8">
        <h3 className={cn("text-base font-medium mb-1", getTitleStateColors())}>
          {title}
        </h3>
        {description && (
          <p className="text-sm text-neutral-500">{description}</p>
        )}
      </div>
    </div>
  );
}