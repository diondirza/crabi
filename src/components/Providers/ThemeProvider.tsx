import { App, ConfigProvider, type ThemeConfig } from 'antd';
import type { FC, ReactNode } from 'react';

const themeConfig: ThemeConfig = {
  components: {
    Table: {
      fontSize: 12,
    },
  },
  token: {
    borderRadius: 8,
  },
};

interface Props {
  children: ReactNode;
}

export const ThemeProvider: FC<Props> = ({ children }) => (
  <ConfigProvider theme={themeConfig}>
    <App>{children}</App>
  </ConfigProvider>
);
