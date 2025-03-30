export default function BookDetailSkeleton() {
    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg">
              <div className="row g-0">
               
                <div className="col-md-4">
                  <div className="skeleton-image w-100"></div>
                </div>
  
                <div className="col-md-8">
                  <div className="card-body">
                    
                    <h5 className="skeleton-text w-75"></h5>
  
                    
                    <h6 className="skeleton-text w-50"></h6>
  
                    <p className="skeleton-text w-50"></p>
  
                  
                    <p className="skeleton-text w-50"></p>
  
                   
                    <div className="skeleton-badge"></div>
  
                   
                    <div className="skeleton-button w-50 mt-3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* CSS for Skeleton Styling */}
        <style jsx>{`
          .skeleton-image {
            height: 250px;
            background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
            background-size: 400% 100%;
            animation: skeleton-loading 1.5s infinite ease-in-out;
          }
          .skeleton-text {
            height: 20px;
            background: #e0e0e0;
            border-radius: 4px;
            animation: skeleton-loading 1.5s infinite ease-in-out;
            margin-bottom: 10px;
          }
          .skeleton-badge {
            width: 80px;
            height: 24px;
            background: #e0e0e0;
            border-radius: 12px;
            animation: skeleton-loading 1.5s infinite ease-in-out;
          }
          .skeleton-button {
            height: 40px;
            background: #e0e0e0;
            border-radius: 6px;
            animation: skeleton-loading 1.5s infinite ease-in-out;
          }
          @keyframes skeleton-loading {
            0% {
              background-position: 100% 0;
            }
            100% {
              background-position: -100% 0;
            }
          }
        `}</style>
      </div>
    );
  }
  