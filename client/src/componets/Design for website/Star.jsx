function Star ({ percentage }) {
  const starStyle = {
    fontSize: "5vw",
    display: "inline-block",
    background: `linear-gradient(90deg, #ffc107 ${percentage}%, #e4e5e9 ${percentage}%)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  return <span style={starStyle}>★</span>;
};

const RatingSystem = ({ rating = 3.7 }) => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((index) => {
        let fill = 0;
        if (rating >= index) {
          fill = 100; 
        } else if (rating > index - 1) {
          fill = (rating - (index - 1)) * 100; 
        }

        return <Star key={index} percentage={fill} />;
      })}
      
    </div>
  );
};

export default RatingSystem;