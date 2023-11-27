// Testimonials.js
// import React from 'react';

// const Testimonials = () => {
//   return (
//     <section className="bg-gray-100 py-16">
//       <div className="container mx-auto text-center">
//         <h2 className="text-3xl font-bold mb-8">Testimonials</h2>
//         {/* Testimonial cards */}
//       </div>
//     </section>
//   );
// };

// export default Testimonials;

// Testimonials.js
import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      image: 'https://via.placeholder.com/150',
      name: 'John Doe',
      position: 'CEO, Company Name',
      comment: 'A great platform that helped us grow exponentially.',
    },
    {
        id: 1,
        image: 'https://via.placeholder.com/150',
        name: 'John Doe',
        position: 'CEO, Company Name',
        comment: 'A great platform that helped us grow exponentially.',
      },

      {
        id: 1,
        image: 'https://via.placeholder.com/150',
        name: 'John Doe',
        position: 'CEO, Company Name',
        comment: 'A great platform that helped us grow exponentially.',
      },


      {
        id: 1,
        image: 'https://via.placeholder.com/150',
        name: 'John Doe',
        position: 'CEO, Company Name',
        comment: 'A great platform that helped us grow exponentially.',
      },


      {
        id: 1,
        image: 'https://via.placeholder.com/150',
        name: 'John Doe',
        position: 'CEO, Company Name',
        comment: 'A great platform that helped us grow exponentially.',
      },



      {
        id: 1,
        image: 'https://via.placeholder.com/150',
        name: 'John Doe',
        position: 'CEO, Company Name',
        comment: 'A great platform that helped us grow exponentially.',
      },


      {
        id: 1,
        image: 'https://via.placeholder.com/150',
        name: 'John Doe',
        position: 'CEO, Company Name',
        comment: 'A great platform that helped us grow exponentially.',
      },

      {
        id: 1,
        image: 'https://via.placeholder.com/150',
        name: 'John Doe',
        position: 'CEO, Company Name',
        comment: 'A great platform that helped us grow exponentially.',
      },


      {
        id: 1,
        image: 'https://via.placeholder.com/150',
        name: 'John Doe',
        position: 'CEO, Company Name',
        comment: 'A great platform that helped us grow exponentially.',
      },


      {
        id: 1,
        image: 'https://via.placeholder.com/150',
        name: 'John Doe',
        position: 'CEO, Company Name',
        comment: 'A great platform that helped us grow exponentially.',
      },

      {
        id: 1,
        image: 'https://via.placeholder.com/150',
        name: 'John Doe',
        position: 'CEO, Company Name',
        comment: 'A great platform that helped us grow exponentially.',
      },
    // Add more testimonial objects as needed
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-center mb-4">
                <img src={testimonial.image} alt={testimonial.name} className="rounded-full mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{testimonial.name}</h3>
              <h4 className="text-gray-600 mb-2">{testimonial.position}</h4>
              <p className="text-gray-700">{testimonial.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

