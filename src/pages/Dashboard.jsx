import { useAuthStore } from "../feature/auth/store/useAuthStore";
import HeaderDashboard from "../feature/dashboard/components/HeaderDashboard";
import Footer from "../components/Footer";
import CoursesActive from "../feature/dashboard/components/CoursesActive";
import { SkeletonCard } from "../components/SkeletonCard";
import { CeroItems } from "../components/CeroItems";
import { BookMarkedIcon } from "lucide-react";
import { useMyCourses } from "../feature/course/hooks/useCourses";

function Dashboard() {
  const { myCourses, loading, myProgress } = useMyCourses();

  const logout = useAuthStore((state) => state.logout);
  const full_name = useAuthStore((state) => state.fullName);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <section className="bg-[#f0f3f8] px-4 sm:px-8 md:px-20 lg:px-36 pb-20 pt-6 font-headline overflow-x-hidden">
        <HeaderDashboard handleLogout={handleLogout} />
        <section className="pt-10 pb-10">
          <p className="text-primary font-bold">Panel de Control</p>
          <h4 className="text-text text-4xl font-bold">Hola, {full_name} ✨</h4>
          <p className="text-text-secondary">
            Es un gran dia para aprender algo nuevo.
          </p>
        </section>
        <section>
          <p className="text-text text-4xl font-bold mb-8">
            Mis Cursos Activos
          </p>
          {loading ? (
            <div className="flex flex-col gap-10">
              {[1].map((i) => (
                <SkeletonCard key={i} size="sm" />
              ))}
            </div>
          ) : myCourses.length === 0 ? (
            <CeroItems
              titulo="No estas enrolado a ningun curso"
              Icon={BookMarkedIcon}
              className="py-20"
            />
          ) : (
            <div className="gap-8 flex flex-col">
              {myCourses.map((course) => (
                <CoursesActive
                  course={course}
                  key={course.id}
                  myProgress={myProgress}
                />
              ))}
            </div>
          )}
        </section>
      </section>
      <Footer />
    </>
  );
}

export default Dashboard;
