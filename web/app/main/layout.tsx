import NavBar from "./components/Navbar";

export default function AppsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[100vh] flex-col">
      <NavBar className="sticky inset-0 z-50" />
      <div className="flex items-center mt-10 h-full">{children}</div>
    </div>
  );
}
