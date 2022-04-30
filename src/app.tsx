import { Link, RequestConfig, history } from 'umi';

import { BookOutlined } from '@ant-design/icons';
import Footer from '@/components/Footer';
import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { ResponseError } from 'umi-request';
import RightContent from '@/components/RightContent';
import type { RunTimeLayoutConfig } from 'umi';
import { SettingDrawer } from '@ant-design/pro-layout';
import defaultSettings from '../config/defaultSettings';
import { notification } from 'antd';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          <Link to="/~docs" key="docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <div>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={settings => {
                setInitialState(preInitialState => ({
                  ...preInitialState,
                  settings
                }));
              }}
            />
          )}
        </div>
      );
    },
    ...initialState?.settings
  };
};

//#region ErrorHandler
const codeMessage = (code: number): string => {
  switch (code) {
    case 200:
      return '服务器成功返回请求的数据.';
    case 201:
      return '新建或修改数据成功.';
    case 202:
      return '一个请求已经进入后台排队(异步任务).';
    case 204:
      return '删除数据成功.';
    case 400:
      return '发出的请求有错误,服务器没有进行新建或修改数据的操作.';
    case 401:
      return '用户没有权限(令牌,用户名,密码错误).';
    case 403:
      return '用户得到授权,但是访问是被禁止的.';
    case 404:
      return '发出的请求针对的是不存在的记录,服务器没有进行操作.';
    case 405:
      return '请求方法不被允许.';
    case 406:
      return '请求的格式不可得.';
    case 410:
      return '请求的资源被永久删除,且不会再得到的.';
    case 422:
      return '当创建一个对象时,发生一个验证错误.';
    case 500:
      return '服务器发生错误,请检查服务器.';
    case 502:
      return '网关错误.';
    case 503:
      return '服务不可用,服务器暂时过载或维护.';
    case 504:
      return '网关超时.';
    default:
      return `未知错误,错误代码:${code}`;
  }
};

/**
 * 异常处理程序
 */
const errorHandler = (error: ResponseError) => {
  const { response } = error;
  if (response && response.status) {
    const { status, url, statusText } = response;
    const errorText = codeMessage(status) || statusText;
    notification.error({ message: `请求错误 ${status}: ${url}`, description: errorText });
  }
  if (!response) notification.error({ description: '您的网络发生异常,无法连接服务器', message: '网络异常' });
  throw error;
};
//#endregion

export const request: RequestConfig = {
  // API 符合规范则使用errorHandler，不规范使用errorConfig
  errorHandler: errorHandler,
  // errorConfig: {
  //   adaptor: (res: any) => ({
  //     data: res.data,
  //     success: res.code === 1000,
  //     errorMessage: res.message || res.msg,
  //     errorCode: res.code,
  //     showType: ErrorShowType.NOTIFICATION
  //   })
  // },
  prefix: '',
  // method: 'POST',
  // requestType: 'form',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include',
  middlewares: [],
  requestInterceptors: [
    // (url: string, options) => {
    //   options.headers = { Authorization: Cookies.get('userToken') ?? '' };
    //   return { url, options };
    // }
  ],
  responseInterceptors: []
};
