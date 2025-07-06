import axios from 'axios';

// API基础URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://tushuguan-backend.onrender.com';

console.log('API_URL:', API_URL); // 调试信息

// 创建axios实例
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // 添加更多配置
  withCredentials: false, // 不发送cookies
  timeout: 10000, // 10秒超时
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    console.log('发送请求:', config.url);
    return config;
  },
  (error) => {
    console.error('请求错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    console.log('收到响应:', response.status);
    return response;
  },
  (error) => {
    console.error('响应错误:', error.message);
    if (error.response) {
      console.error('错误状态码:', error.response.status);
      console.error('错误数据:', error.response.data);
    }
    return Promise.reject(error);
  }
);

// 获取所有图书
export async function getBooks() {
  try {
    console.log('正在获取图书列表...');
    const response = await api.get('/api/books?populate=author,category,cover');
    console.log('获取图书成功:', response.data);
    return response.data;
  } catch (error) {
    console.error('获取图书列表失败:', error);
    throw error;
  }
}

// 获取单本图书详情
export async function getBook(id) {
  try {
    const response = await api.get(`/api/books/${id}?populate=author,category,publisher,cover`);
    return response.data;
  } catch (error) {
    console.error(`获取图书ID:${id}失败:`, error);
    throw error;
  }
}

// 获取所有分类
export async function getCategories() {
  try {
    const response = await api.get('/api/categories');
    return response.data;
  } catch (error) {
    console.error('获取分类列表失败:', error);
    throw error;
  }
}

// 获取单个分类详情
export async function getCategory(id) {
  try {
    const response = await api.get(`/api/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error(`获取分类ID:${id}失败:`, error);
    throw error;
  }
}

// 获取某个分类下的所有图书
export async function getCategoryBooks(categoryId) {
  try {
    const response = await api.get(`/api/books?filters[category][id][$eq]=${categoryId}&populate=author,cover`);
    return response.data;
  } catch (error) {
    console.error(`获取分类ID:${categoryId}下的图书失败:`, error);
    throw error;
  }
}

// 获取所有作者
export async function getAuthors() {
  try {
    const response = await api.get('/api/authors');
    return response.data;
  } catch (error) {
    console.error('获取作者列表失败:', error);
    throw error;
  }
}

// 获取单个作者详情
export async function getAuthor(id) {
  try {
    const response = await api.get(`/api/authors/${id}?populate=books`);
    return response.data;
  } catch (error) {
    console.error(`获取作者ID:${id}失败:`, error);
    throw error;
  }
}

// 获取某个作者的所有图书
export async function getAuthorBooks(authorId) {
  try {
    const response = await api.get(`/api/books?filters[author][id][$eq]=${authorId}&populate=category,cover`);
    return response.data;
  } catch (error) {
    console.error(`获取作者ID:${authorId}的图书失败:`, error);
    throw error;
  }
}

export default api;