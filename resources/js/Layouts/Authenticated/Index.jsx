import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
export default function Authenticated({ auth, children }) {
    return (
        <>
            <div className="mx-auto max-w-screen hidden lg:block">
                {/* STRAT: sidebar */}
                <Sidebar auth={auth} />
                {/* END: sidebar */}

                {/* STRAT: content */}
                <div className="ml-[300px] px-[50px]">
                    <div className="py-10 flex flex-col gap-[50px]">
                        {/* STRAT: topbar */}
                        <Topbar name={auth.user.name} />
                        {/* END: topbar */}
                    </div>
                    <main>{children}</main>
                </div>
                {/* END: content */}
            </div>

            <div className="mx-auto px-4 w-full h-screen lg:hidden flex bg-black">
                <div className="text-white text-2xl text-center leading-snug font-medium my-auto">
                    Sorry, this page only supported on 1024px screen or above
                </div>
            </div>
        </>
    )
}
