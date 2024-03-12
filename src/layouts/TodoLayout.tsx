const TodoLayout = (
    { children }: { children: React.ReactNode }
) => {
  return (
    <main
        className="w-full lg:w-4/5 h-[95vh] text-black overflow-y-auto"
    >
        {children}
    </main>
  )
}

export default TodoLayout