const path = require("path");
const webpack = require("webpack");

// 모듈을 밖으로 빼내는 노드 JS 문법
// 엔드틸, 아웃풋, 번들링 모드를 설정할 수 있다
module.exports = {
  mode: "development",

  entry: {
    main: path.resolve("./src/app.js"),
  },

  output: {
    filename: "[name].js",
    path: path.resolve("./dist"),
  },

  module: {
    // 로더를 추가하는 장소
    rules: [
      /* {
        test: /|.js$/,
        us: [path.resolve("./myLoader.js")],
      }, */

      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024,
          },
        },
      },
    ],
  },

  plugins: [
    new webpack.BannerPlugin({
      banner: `마지막 빌드 시간은 : ${new Date().toLocaleString()} 입니다.`,
    }),
  ],
};
