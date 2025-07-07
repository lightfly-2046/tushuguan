export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <section className="bg-blue-100 p-8 rounded-lg mb-8">
        <h1 className="text-3xl font-bold mb-4">欢迎来到图书馆管理系统</h1>
        <p className="text-lg mb-4">
          这是一个使用Next.js和Strapi构建的现代化图书馆管理系统。
        </p>
        <div className="flex space-x-4">
          <a 
            href="/books" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            浏览图书
          </a>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">系统功能</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded">
            <h3 className="text-xl font-semibold mb-2">图书管理</h3>
            <p>添加、编辑、删除图书信息，包括标题、作者、描述等。</p>
          </div>
          <div className="border p-4 rounded">
            <h3 className="text-xl font-semibold mb-2">作者管理</h3>
            <p>管理作者信息，包括姓名、简介等。</p>
          </div>
        </div>
      </section>
    </div>
  );
}