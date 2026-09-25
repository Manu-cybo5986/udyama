import type { Metadata } from "next";
import FinancialCalculator from "@/components/financial/FinancialCalculator";

export const metadata: Metadata = {
  title: "UdyamAI - Financial Calculator & Scheme Matching",
  description:
    "National Scheme Matching & Financial Assistance Portal for Entrepreneurs (SIH 2026)",
};

export default function FinancialPage() {
  return <FinancialCalculator />;
}
