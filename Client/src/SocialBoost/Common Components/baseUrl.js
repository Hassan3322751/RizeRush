const baseUrl = () => {
let status = import.meta.env.VITE_STATUS;

  return status === 'deploy' ? 'https://social-boost-api.vercel.app/api/v1' : 
  status === "production" ? 'https://w8gr56t2-4055.inc1.devtunnels.ms/api/v1' : "/api/v1"
  // return status === 'deploy' ? 'https://social-boost-api.vercel.app/api/v1' : '/api/v1'
}

export default baseUrl