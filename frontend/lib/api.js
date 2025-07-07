import axios from 'axios';
import qs from 'qs';

// API基础URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

// 生产环境下移除调试信息
const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment) {
  console.log('API_URL:', API_URL);
}

// 创建axios实例
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10秒超时
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    if (isDevelopment) {
      console.log('发送请求:', config.url);
    }
    return config;
  },
  (error) => {
    if (isDevelopment) {
      console.error('请求错误:', error);
    }
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    if (isDevelopment) {
      console.log('收到响应:', response.status);
    }
    return response;
  },
  (error) => {
    if (isDevelopment) {
      console.error('响应错误:', error.message);
      if (error.response) {
        console.error('错误状态码:', error.response.status);
        console.error('错误数据:', error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

// 获取所有图书
export async function getBooks(params = {}) {
  const defaultParams = {
    populate: ['author'],
    ...params
  };
  
  const query = qs.stringify(defaultParams, {
    encodeValuesOnly: true,
  });
  
  try {
    if (isDevelopment) {
      console.log(`正在获取图书列表... (查询: ${query})`);
    }
    const response = await api.get(`/api/books?${query}`);
    if (isDevelopment) {
      console.log('获取图书成功:', response.data);
    }
    return response.data;
  } catch (error) {
    if (isDevelopment) {
      console.error('获取图书列表失败:', error);
    }
    throw error;
  }
}

// 获取单本图书详情
export async function getBook(id) {
  try {
    const response = await api.get(`/api/books/${id}?populate=*`);
    return response.data;
  } catch (error) {
    if (isDevelopment) {
      console.error(`获取图书ID:${id}失败:`, error);
    }
    throw error;
  }
}

// 获取所有作者
export async function getAuthors() {
  try {
    const response = await api.get('/api/authors?populate=*');
    return response.data;
  } catch (error) {
    if (isDevelopment) {
      console.error('获取作者列表失败:', error);
    }
    throw error;
  }
}

// 获取单个作者详情
export async function getAuthor(id) {
  try {
    const response = await api.get(`/api/authors/${id}?populate=books`);
    return response.data;
  } catch (error) {
    if (isDevelopment) {
      console.error(`获取作者ID:${id}失败:`, error);
    }
    throw error;
  }
}

// 获取某个作者的所有图书
export async function getAuthorBooks(authorId) {
  try {
    const response = await api.get(`/api/books?filters[author][id][$eq]=${authorId}&populate=*`);
    return response.data;
  } catch (error) {
    if (isDevelopment) {
      console.error(`获取作者ID:${authorId}的图书失败:`, error);
    }
    throw error;
  }
}

export default api;
