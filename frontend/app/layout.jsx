import '../styles/globals.css';

export const metadata = {
  title: '图书馆管理系统',
  description: '一个现代化的图书馆管理系统',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">图书馆管理系统</h1>
            <nav className="mt-2">
              <ul className="flex space-x-4">
                <li><a href="/" className="hover:underline">首页</a></li>
                <li><a href="/books" className="hover:underline">图书</a></li>
                <li><a href="/categories" className="hover:underline">分类</a></li>
                <li><a href="/authors" className="hover:underline">作者</a></li>
              </ul>
            </nav>
          </div>
        </header>
        
        <main className="container mx-auto p-4">
          {children}
        </main>
        
        <footer className="bg-gray-800 text-white p-4 mt-8">
          <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} 图书馆管理系统</p>
          </div>
        </footer>
      </body>
    </html>
  );
}