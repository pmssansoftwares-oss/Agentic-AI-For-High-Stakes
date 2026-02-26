import ProtectedLayout from "@/components/ProtectedLayout";

export default function AppProtectedLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}
