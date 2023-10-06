const path = require("path");
const webpack = require("webpack");
const childProcess = require("child_process");
require("dotenv").config();
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

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
      banner: `
      Commit version : ${childProcess.execSync("git rev-parse --short HEAD")}
      Committer : ${childProcess.execSync("git config user.name")} 
      마지막 빌드 시간 : ${new Date().toLocaleString()} .`,
    }),

    new webpack.DefinePlugin({
      //pw: 123456,
      dev: JSON.stringify(process.env.DEV_API),
      pro: JSON.stringify(process.env.PRO_API),
    }),

    new HtmlWebpackPlugin({
      template: "./index.html",
    }),

    new CleanWebpackPlugin(),
  ],

  optimization: {
    // 이미지 압축 작업을 실행할지 결정
    minimize: true,
    minimizer: [
      new ImageMinimizerPlugin({
        test: /\.(jpe?g|png|gif|svg)/i,
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [["imagemin-optipng", { optimizationLevel: 3 }]],
          },
        },
      }),
    ],
  },
};
