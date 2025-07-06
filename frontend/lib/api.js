/**
 * 与Strapi API通信的服务
 */

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

/**
 * 获取完整的API URL
 * @param {string} path - API路径
 * @returns {string} 完整的API URL
 */
export function getStrapiURL(path = '') {
  return `${API_URL}${path}`;
}

/**
 * 获取媒体URL
 * @param {object} media - 媒体对象
 * @returns {string} 媒体URL
 */
export function getStrapiMedia(media) {
  if (!media) return null;
  
  // 如果是Cloudinary URL，直接返回
  if (media.url && media.url.startsWith('http')) {
    return media.url;
  }
  
  // 否则拼接Strapi URL
  const { url } = media;
  return url.startsWith('/') ? getStrapiURL(url) : url;
}

/**
 * 获取API数据
 * @param {string} path - API路径
 * @param {object} urlParamsObject - URL参数
 * @param {object} options - 请求选项
 * @returns {Promise} API响应
 */
export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  // 构建URL
  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  // 构建查询参数
  const queryString = Object.keys(urlParamsObject)
    .map((key) => {
      const value = urlParamsObject[key];
      return `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`;
    })
    .join('&');

  // 确保路径以/开头
  const apiPath = path.startsWith('/') ? path : `/${path}`;
  
  // 发送请求
  const requestUrl = `${getStrapiURL(`/api${apiPath}${queryString ? `?${queryString}` : ''}`)}`;
  console.log('Fetching from:', requestUrl);
  
  const response = await fetch(requestUrl, mergedOptions);

  // 处理错误
  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`请求错误: ${response.status}`);
  }
  
  // 返回数据
  const data = await response.json();
  return data;
}

/**
 * 获取所有书籍
 * @param {object} params - 查询参数
 * @returns {Promise} 书籍列表
 */
export async function getBooks(params = {}) {
  const defaultParams = {
    populate: {
      cover: {
        fields: ['url', 'alternativeText'],
      },
      author: {
        fields: ['name'],
      },
      categories: {
        fields: ['name'],
      },
      publisher: {
        fields: ['name'],
      },
    },
  };
  
  const mergedParams = {
    ...defaultParams,
    ...params,
  };
  
  return fetchAPI('/books', mergedParams);
}

/**
 * 获取单本书籍
 * @param {string} id - 书籍ID
 * @returns {Promise} 书籍详情
 */
export async function getBook(id) {
  return fetchAPI(`/books/${id}`, {
    populate: {
      cover: {
        fields: ['url', 'alternativeText'],
      },
      author: {
        fields: ['name', 'bio', 'photo'],
      },
      categories: {
        fields: ['name'],
      },
      publisher: {
        fields: ['name', 'address', 'contact'],
      },
    },
  });
}

/**
 * 获取所有分类
 * @returns {Promise} 分类列表
 */
export async function getCategories() {
  return fetchAPI('/categories', {
    populate: {
      icon: {
        fields: ['url', 'alternativeText'],
      },
    },
  });
}

/**
 * 获取单个分类
 * @param {string} id - 分类ID
 * @returns {Promise} 分类详情
 */
export async function getCategory(id) {
  return fetchAPI(`/categories/${id}`, {
    populate: {
      icon: {
        fields: ['url', 'alternativeText'],
      },
      books: {
        populate: {
          cover: {
            fields: ['url', 'alternativeText'],
          },
        },
      },
    },
  });
}

/**
 * 获取所有作者
 * @returns {Promise} 作者列表
 */
export async function getAuthors() {
  return fetchAPI('/authors', {
    populate: {
      photo: {
        fields: ['url', 'alternativeText'],
      },
    },
  });
}

/**
 * 获取单个作者
 * @param {string} id - 作者ID
 * @returns {Promise} 作者详情
 */
export async function getAuthor(id) {
  return fetchAPI(`/authors/${id}`, {
    populate: {
      photo: {
        fields: ['url', 'alternativeText'],
      },
      books: {
        populate: {
          cover: {
            fields: ['url', 'alternativeText'],
          },
        },
      },
    },
  });
}

/**
 * 获取所有出版社
 * @returns {Promise} 出版社列表
 */
export async function getPublishers() {
  return fetchAPI('/publishers');
}

/**
 * 获取单个出版社
 * @param {string} id - 出版社ID
 * @returns {Promise} 出版社详情
 */
export async function getPublisher(id) {
  return fetchAPI(`/publishers/${id}`, {
    populate: {
      books: {
        populate: {
          cover: {
            fields: ['url', 'alternativeText'],
          },
        },
      },
    },
  });
}