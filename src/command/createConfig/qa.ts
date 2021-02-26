interface ResultType {
  browserOpen: boolean;
  unit: string;
  pstatus: string;
};

export default async (resolve: (value: ResultType) => void) =>
  resolve(
    await require('inquirer').prompt([
      {
        type: 'confirm',
        message: '开发模式编译完成后自动开启浏览器？',
        name: 'browserOpen',
        default: false
      },
      {
        type: 'list',
        message: '是否需要单位转换单位（默认为px不转换）：',
        name: 'unit',
        default: 'px',
        choices: [
          "px",
          "rem",
          "vw",
        ],
        filter: (val: any) => val.toLowerCase(),
      },
      {
        type: 'list',
        message: '状态管理：',
        name: 'pstatus',
        default: 'redux',
        choices: [
          "redux",
        ],
        filter: (val: any) => val.toLowerCase(),
      },
    ])
  );
