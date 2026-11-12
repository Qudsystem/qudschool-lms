import { motion } from "framer-motion";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface SocialItem {
  /** حرف يظهر في الجهة الخلفية (اختياري) */
  letter?: string;
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  /** لون العلامة عند التحويم (tailwind bg class) */
  brandBg?: string;
}

interface SocialFlipButtonProps {
  items: SocialItem[];
  className?: string;
  showContainer?: boolean;
  itemClassName?: string;
  frontClassName?: string;
  backClassName?: string;
}

const SocialFlipNode = ({
  item,
  isHovered,
  setTooltipIndex,
  tooltipIndex,
  index,
  itemClassName,
  frontClassName,
  backClassName,
}: {
  item: SocialItem;
  isHovered: boolean;
  setTooltipIndex: (val: number | null) => void;
  tooltipIndex: number | null;
  index: number;
  itemClassName?: string;
  frontClassName?: string;
  backClassName?: string;
}) => {
  const Wrapper = item.href ? "a" : "button";
  const wrapperProps = item.href
    ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
    : { onClick: item.onClick, type: "button" as const };

  return (
    <Wrapper
      {...wrapperProps}
      className={cn("relative h-10 w-10 cursor-pointer", itemClassName)}
      onMouseEnter={() => setTooltipIndex(index)}
      onMouseLeave={() => setTooltipIndex(null)}
      aria-label={item.label}
    >
      {/* Tooltip */}
      <motion.div
        initial={false}
        animate={{
          opacity: isHovered && tooltipIndex === index ? 1 : 0,
          y: isHovered && tooltipIndex === index ? -6 : 4,
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-[11px] font-medium text-white shadow-lg dark:bg-gray-100 dark:text-gray-900"
      >
        {item.label}
      </motion.div>

      {/* Button surface */}
      <div
        className={cn(
          "group/btn relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-white text-gray-500 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400",
          "hover:-translate-y-0.5 hover:shadow-md",
          frontClassName
        )}
      >
        {/* Icon (always visible) */}
        <span className="relative z-10 text-[15px] transition-colors duration-300 group-hover/btn:text-white">
          {item.icon}
        </span>

        {/* Brand color wash on hover */}
        <span
          className={cn(
            "absolute inset-0 scale-0 rounded-full bg-primary opacity-0 transition-all duration-300 group-hover/btn:scale-100 group-hover/btn:opacity-100",
            item.brandBg,
            backClassName
          )}
        />
      </div>
    </Wrapper>
  );
};

export default function SocialFlipButton({
  items,
  className,
  showContainer = false,
  itemClassName,
  frontClassName,
  backClassName,
}: SocialFlipButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);

  return (
    <div
      dir="ltr"
      className={cn(
        "inline-flex flex-wrap items-center gap-2.5",
        showContainer && "rounded-xl border border-gray-200 bg-gray-50/60 p-3 dark:border-gray-700 dark:bg-gray-800/40",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setTooltipIndex(null);
      }}
    >
      {items.map((item, index) => (
        <SocialFlipNode
          key={index}
          item={item}
          index={index}
          isHovered={isHovered}
          setTooltipIndex={setTooltipIndex}
          tooltipIndex={tooltipIndex}
          itemClassName={itemClassName}
          frontClassName={frontClassName}
          backClassName={backClassName}
        />
      ))}
    </div>
  );
}
