import { SideBar } from "../components"
import TodoLayout from "./TodoLayout"

const MainLayout = (
    { children }: { children: React.ReactNode }
) => {
    return (
        <div className="justify-between max-w-screen-2xl 
        flex items-center overflow-hidden mx-3 md:mx-5 mt-5 gap-3
            flex-wrap lg:flex-nowrap lg:gap-5 lg:mx-auto lg:mt-10
        ">
            <SideBar />
            <TodoLayout>
                {children}
            </TodoLayout>
        </div>
    )
}

export default MainLayout