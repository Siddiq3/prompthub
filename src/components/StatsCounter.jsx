export default function StatsCounter({ totalPrompts = 0, totalAiTools = 0 }) {
  return (
    <div className="grid grid-cols-3 gap-6 sm:gap-8">
      <div className="text-center">
        <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          {totalPrompts}+
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          Prompts
        </p>
      </div>
      <div className="text-center">
        <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          {totalAiTools}
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          AI Tools
        </p>
      </div>
      <div className="text-center">
        <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          Free
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          Forever
        </p>
      </div>
    </div>
  );
}
