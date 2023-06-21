import { addMeasure } from "@/lib/actions"

export const AddMeasure = () => {
  return (
    <form action={addTodo} className="flex items-center gap-2">
      <input
        type="text"
        name="title"
        className="w-full grow rounded-lg p-1 text-2xl"
        placeholder="New Todo"
        autoFocus
      />

      <button
        type="submit"
        className="max-w-xs rounded-2xl border-2 border-solid border-black bg-green-500 p-2 text-xl text-black hover:cursor-pointer hover:bg-green-400"
      >
        Submit
      </button>
    </form>
  )
}
