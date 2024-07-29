const baseUrl = () => {
let status = import.meta.env.VITE_STATUS;

  return status === 'deploy' ? 'https://social-boost-api.vercel.app/api/v1' : 
  status === "production" ? 'https://rize-dun.vercel.app/api/v1' : "http://localhost:4055/api/v1"
}

export default baseUrl