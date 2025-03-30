export default function HomePageSkeleton() {
    return (
      <div className="container mt-5">
        <div className="row">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="bg-light skeleton-image mb-3"></div>
  
                  <h5 className="skeleton-text bg-light"></h5>
  
                  <p className="skeleton-text bg-light"></p>
  
                  <div className="skeleton-button bg-light"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
  
        {/* CSS for Skeleton Styling */}
        <style jsx>{`
          .skeleton-image {
            height: 150px;
            width: 100%;
            border-radius: 8px;
            animation: skeleton-loading 1.5s infinite ease-in-out;
          }
          .skeleton-text {
            height: 20px;
            width: 80%;
            margin-bottom: 10px;
            border-radius: 4px;
            animation: skeleton-loading 1.5s infinite ease-in-out;
          }
          .skeleton-button {
            height: 40px;
            width: 100%;
            border-radius: 6px;
            animation: skeleton-loading 1.5s infinite ease-in-out;
          }
          @keyframes skeleton-loading {
            0% {
              background-color: #e0e0e0;
            }
            100% {
              background-color: #f0f0f0;
            }
          }
        `}</style>
      </div>
    );
  }
  