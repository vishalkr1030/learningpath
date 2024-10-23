import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LearningPath = (props) => {
  const nodes = props.path;
  const [heights, setHeights] = useState([]);
  const textRefs = useRef([]);

  useEffect(() => {
    const blockHeights = textRefs.current.map(ref => ref.offsetTop + (ref.offsetHeight / 2));
    setHeights(blockHeights);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="title my-4">
        <h3 className="text-lg font-bold">Learning Path For {nodes.domain}</h3>
      </div>
      <div className="describe mb-6">
        <p className="text-sm text-gray-600">{nodes.description}</p>
      </div>
      
      <div className="relative">
        {nodes.coursestitle.map((node, index) => (
          <motion.div
            key={index}
            ref={(el) => (textRefs.current[index] = el)}
            className={`flex items-center mb-8 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className={`w-64 p-4 rounded-full bg-white shadow-lg flex items-center ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}>
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
              </div> 
              <div className={`flex-grow ${index % 2 === 0 ? 'ml-4' : 'mr-4'}`}>
                <h3 className="text-lg font-semibold">{node}</h3>
              </div>
            </div>
          </motion.div>
        ))}

        <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-blue-300" style={{ transform: 'translateX(-50%)' }}>
          {heights.length > 0 && nodes.coursestitle.map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-3 h-3 bg-blue-500 rounded-full"
              style={{
                top: `${heights[index]}px`,
                left: index % 2 === 0 ? 'calc(50% - 16px)' : 'calc(50% + 8px)',
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningPath;
