module.exports = {
  port: 8080,
  logLevel: 'silent',
  files: ['./dist/**/*.{html,htm,css,js}'],
  server: { 
    baseDir: './dist/angular-v10',
    middleware: {
      0: null
    }
  },
  open: false
};
