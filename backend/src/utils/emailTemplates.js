export const foodClaimedOwnerTemplate = ({ food, ngo, restaurant }) => {
  return `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
      
      <!-- Header with gradient -->
      <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: #ffffff; padding: 40px 30px; text-align: center; position: relative;">
        <div style="font-size: 60px; margin-bottom: 10px;">🎉</div>
        <h2 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Your Food Was Claimed!</h2>
        <p style="margin: 10px 0 0 0; opacity: 0.95; font-size: 16px;">Making a difference, one meal at a time</p>
      </div>

      <!-- Content -->
      <div style="padding: 40px 30px; color: #1f2937;">
        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
          Hello <b style="color: #1e3a8a;">${restaurant.name}</b>,
        </p>

        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
          Great news! Your generous food donation has been successfully claimed by 
          <b style="color: #16a34a;">${ngo.name}</b>. Your contribution is making a real impact! ✨
        </p>

        <!-- Food Details Card -->
        <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 16px; padding: 25px; margin: 25px 0; border-left: 5px solid #22c55e; box-shadow: 0 4px 15px rgba(34, 197, 94, 0.1);">
          <h3 style="margin: 0 0 15px 0; color: #15803d; font-size: 18px; font-weight: 700;">
            📋 Donation Details
          </h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #4b5563; font-weight: 600; width: 35%;">
                <span style="display: inline-block; margin-right: 8px;">🍽</span> Food Item
              </td>
              <td style="padding: 8px 0; color: #111827; font-weight: 700;">
                ${food.food_name}
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #4b5563; font-weight: 600;">
                <span style="display: inline-block; margin-right: 8px;">📦</span> Quantity
              </td>
              <td style="padding: 8px 0; color: #111827; font-weight: 700;">
                ${food.quantity}
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #4b5563; font-weight: 600;">
                <span style="display: inline-block; margin-right: 8px;">⏰</span> Expiry Time
              </td>
              <td style="padding: 8px 0; color: #111827; font-weight: 700;">
                ${new Date(food.expiry_time).toLocaleString()}
              </td>
            </tr>
          </table>
        </div>

        <!-- Food Image -->
        <div style="margin: 30px 0; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.15);">
          <img 
            src="${food.food_image?.[0]?.url}" 
            alt="Food Image"
            style="width: 100%; display: block; height: 300px; object-fit: cover;"
          />
        </div>

        <!-- Thank You Message -->
        <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 16px; padding: 25px; margin: 25px 0; text-align: center; border: 2px solid #fbbf24;">
          <p style="margin: 0; font-size: 16px; line-height: 1.7; color: #78350f;">
            <b style="font-size: 18px; display: block; margin-bottom: 10px;">Thank You!</b>
            Your generosity helps reduce food waste and supports people in need.
            Together, we're building a better, more sustainable world. ❤️
          </p>
        </div>

        <!-- Location Button -->
        <div style="text-align: center; margin-top: 30px;">
          <a
            href="https://www.google.com/maps?q=${food.location.coordinates[1]},${food.location.coordinates[0]}"
            style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; box-shadow: 0 8px 20px rgba(34, 197, 94, 0.3); transition: all 0.3s;">
            📍 View Pickup Location
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); padding: 30px; text-align: center;">
        <h3 style="margin: 0 0 10px 0; color: #1e293b; font-size: 20px; font-weight: 700;"> 🌱
          <a href = "https://resqfood-cc.vercel.app" style="color: #93c10aff" > ResQFood</a>
        </h3>
        <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.6;">
          Saving Food, Serving Hope 🌍<br/>
          <span style="font-size: 12px;">Together, we make a difference</span>
        </p>
      </div>
    </div>
  </div>
  `;
};


export const foodClaimedNgoTemplate = ({ food, restaurant }) => {
  return `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%); color: #ffffff; padding: 40px 30px; text-align: center;">
        <div style="font-size: 60px; margin-bottom: 10px;">✅</div>
        <h2 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Food Claimed Successfully!</h2>
        <p style="margin: 10px 0 0 0; opacity: 0.95; font-size: 16px;">Ready for collection</p>
      </div>

      <!-- Content -->
      <div style="padding: 40px 30px; color: #1f2937;">
        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
          Hello <b style="color: #16a34a;">Team</b>,
        </p>

        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
          You have successfully claimed a food donation! Please review the details below and collect the food before it expires. 🎯
        </p>

        <!-- Donation Info Card -->
        <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-radius: 16px; padding: 30px; margin: 25px 0; border: 2px solid #10b981; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.15);">
          <h3 style="margin: 0 0 20px 0; color: #065f46; font-size: 20px; font-weight: 700; text-align: center;">
            📦 Collection Details
          </h3>
          
          <div style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 15px;">
            <div style="margin-bottom: 15px;">
              <span style="display: block; color: #6b7280; font-size: 13px; font-weight: 600; margin-bottom: 5px;">FOOD ITEM</span>
              <span style="display: block; color: #111827; font-size: 18px; font-weight: 700;">${food.food_name}</span>
            </div>
            <div style="margin-bottom: 15px;">
              <span style="display: block; color: #6b7280; font-size: 13px; font-weight: 600; margin-bottom: 5px;">QUANTITY</span>
              <span style="display: block; color: #111827; font-size: 18px; font-weight: 700;">${food.quantity}</span>
            </div>
            <div style="margin-bottom: 15px;">
              <span style="display: block; color: #6b7280; font-size: 13px; font-weight: 600; margin-bottom: 5px;">DONOR</span>
              <span style="display: block; color: #111827; font-size: 18px; font-weight: 700;">${restaurant.name}</span>
            </div>
            <div>
              <span style="display: block; color: #6b7280; font-size: 13px; font-weight: 600; margin-bottom: 5px;">⏰ COLLECT BEFORE</span>
              <span style="display: block; color: #dc2626; font-size: 16px; font-weight: 700;">${new Date(food.expiry_time).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <!-- Food Image -->
        <div style="margin: 30px 0; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.15); position: relative;">
          <img 
            src="${food.food_image?.[0]?.url}"
            alt="Food Image"
            style="width: 100%; display: block; height: 320px; object-fit: cover;"
          />
          <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); padding: 20px; color: white;">
            <p style="margin: 0; font-size: 14px; font-weight: 600;">🍽 Ready for pickup</p>
          </div>
        </div>

        <!-- Impact Message -->
        <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 16px; padding: 25px; margin: 25px 0; text-align: center; border-left: 5px solid #f59e0b;">
          <p style="margin: 0; font-size: 16px; line-height: 1.7; color: #78350f;">
            <b style="font-size: 18px; display: block; margin-bottom: 10px;">💚 You're Making a Difference!</b>
            Your work helps fight hunger and reduce waste. Every collection brings hope to someone in need.
          </p>
        </div>

        <!-- Navigation Button -->
        <div style="text-align: center; margin-top: 30px;">
          <a
            href="https://www.google.com/maps?q=${food.location.coordinates[1]},${food.location.coordinates[0]}"
            style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; box-shadow: 0 8px 20px rgba(22, 163, 74, 0.3);">
            📍 Navigate to Pickup Location
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); padding: 30px; text-align: center;">
        <h3 style="margin: 0 0 10px 0; color: #1e293b; font-size: 20px; font-weight: 700;">
          🦸 You're a Hero!
        </h3>
        <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.6;">
          Thank you for being part of <a href = "https://resqfood-cc.vercel.app" style="color: #93c10aff" >ResQFood</a><br/>
          <span style="font-size: 12px;">Together, we're saving food and serving hope</span>
        </p>
      </div>
    </div>
  </div>
  `;
};


export const foodCollectedNgoTemplate = ({ food, restaurant }) => {
  return `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; background: linear-gradient(135deg, #22c55e 0%, #10b981 100%); padding: 40px 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
      
      <!-- Header with celebration -->
      <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #ffffff; padding: 50px 30px; text-align: center; position: relative;">
        <div style="font-size: 70px; margin-bottom: 10px; animation: bounce 2s infinite;">🌟</div>
        <h2 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">Mission Accomplished!</h2>
        <p style="margin: 15px 0 0 0; opacity: 0.95; font-size: 18px;">Food Successfully Delivered</p>
        <div style="margin-top: 20px; display: inline-block;">
          <span style="display: inline-block; width: 60px; height: 4px; background: rgba(255,255,255,0.3); border-radius: 2px; margin: 0 4px;"></span>
          <span style="display: inline-block; width: 60px; height: 4px; background: rgba(255,255,255,0.6); border-radius: 2px; margin: 0 4px;"></span>
          <span style="display: inline-block; width: 60px; height: 4px; background: rgba(255,255,255,1); border-radius: 2px; margin: 0 4px;"></span>
        </div>
      </div>

      <!-- Content -->
      <div style="padding: 50px 40px; color: #1f2937; text-align: center;">
        
        <!-- Success Badge -->
        <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border: 3px solid #22c55e; border-radius: 50%; width: 100px; height: 100px; margin: 0 auto 30px auto; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(34, 197, 94, 0.2);">
          <span style="font-size: 50px;">✓</span>
        </div>

        <h3 style="margin: 0 0 20px 0; color: #16a34a; font-size: 24px; font-weight: 700;">
          Collection Confirmed
        </h3>

        <p style="font-size: 16px; line-height: 1.8; margin: 0 0 30px 0; color: #4b5563;">
          Thank you for collecting <b style="color: #111827;">${food.food_name}</b> from <b style="color: #111827;">${restaurant.name}</b>. 
          This food has now been delivered to those who need it most.
        </p>

        <!-- Impact Stats -->
        <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 16px; padding: 30px; margin: 30px 0; border: 2px solid #86efac;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div style="text-align: center;">
              <div style="font-size: 36px; font-weight: 800; color: #16a34a; margin-bottom: 5px;">1</div>
              <div style="font-size: 14px; color: #4b5563; font-weight: 600;">Meal Delivered</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 36px; font-weight: 800; color: #16a34a; margin-bottom: 5px;">♾️</div>
              <div style="font-size: 14px; color: #4b5563; font-weight: 600;">Lives Touched</div>
            </div>
          </div>
        </div>

        <!-- Appreciation Message -->
        <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 16px; padding: 30px; margin: 30px 0; border-left: 5px solid #f59e0b;">
          <p style="margin: 0; font-size: 18px; line-height: 1.8; color: #78350f;">
            <span style="font-size: 32px; display: block; margin-bottom: 15px;">❤️</span>
            <b style="font-size: 20px;">Your efforts create real impact!</b><br/>
            <span style="font-size: 15px;">Every collection brings hope and nourishment to someone in need. You're not just delivering food—you're delivering dignity and care.</span>
          </p>
        </div>

        <p style="margin: 30px 0 0 0; font-size: 15px; color: #6b7280; font-style: italic;">
          "No act of kindness, no matter how small, is ever wasted."
        </p>
      </div>

      <!-- Footer -->
      <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); padding: 35px; text-align: center;">
        <div style="font-size: 40px; margin-bottom: 15px;">🌱</div>
        <h3 style="margin: 0 0 10px 0; color: #1e293b; font-size: 22px; font-weight: 700;">
          <a href = "https://resqfood-cc.vercel.app" style="color: #93c10aff" >ResQFood </a>Community
        </h3>
        <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.8;">
          Together, we're building a world with less waste and more compassion 🌍<br/>
          <span style="font-size: 13px; font-weight: 600; color: #16a34a;">Thank you for being a changemaker!</span>
        </p>
      </div>
    </div>
  </div>
  `;
};


export const foodCollectedOwnerTemplate = ({ food, ngo }) => {
  return `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; background: linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%); padding: 40px 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: #ffffff; padding: 50px 30px; text-align: center;">
        <div style="font-size: 70px; margin-bottom: 10px;">🎊</div>
        <h2 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">Donation Complete!</h2>
        <p style="margin: 15px 0 0 0; opacity: 0.95; font-size: 18px;">Your food has reached those in need</p>
      </div>

      <!-- Content -->
      <div style="padding: 50px 40px; color: #1f2937;">
        
        <!-- Success Icon -->
        <div style="text-align: center; margin-bottom: 35px;">
          <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border: 3px solid #3b82f6; border-radius: 50%; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(59, 130, 246, 0.2); margin: 0 auto;">
            <span style="font-size: 50px;">✅</span>
          </div>
        </div>

        <h3 style="margin: 0 0 25px 0; text-align: center; color: #1e3a8a; font-size: 24px; font-weight: 700;">
          Thank You for Your Generosity
        </h3>

        <p style="font-size: 16px; line-height: 1.8; margin: 0 0 25px 0; text-align: center; color: #4b5563;">
          Your food donation <b style="color: #1e3a8a; font-size: 18px;">${food.food_name}</b> has been successfully collected by:
        </p>

        <!-- NGO Card -->
        <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 30px; margin: 30px 0; text-align: center; border: 2px solid #3b82f6; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.15);">
          <div style="font-size: 50px; margin-bottom: 15px;">🏢</div>
          <h4 style="margin: 0; color: #1e40af; font-size: 24px; font-weight: 700;">
            ${ngo.name}
          </h4>
          <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 14px;">
            Verified Partner Organization
          </p>
        </div>

        <!-- Impact Message -->
        <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 16px; padding: 30px; margin: 30px 0; text-align: center; border-left: 5px solid #f59e0b;">
          <div style="font-size: 48px; margin-bottom: 15px;">🌍</div>
          <p style="margin: 0; font-size: 17px; line-height: 1.8; color: #78350f;">
            <b style="font-size: 20px; display: block; margin-bottom: 10px;">You're Making a Difference!</b>
            Your contribution helps reduce food waste while supporting those who need it most. Together, we're building a more sustainable and compassionate world.
          </p>
        </div>

        <!-- Stats -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 30px 0;">
          <div style="background: #f0fdf4; border-radius: 12px; padding: 20px; text-align: center; border: 2px solid #86efac;">
            <div style="font-size: 32px; margin-bottom: 8px;">♻️</div>
            <div style="font-size: 14px; color: #15803d; font-weight: 700;">WASTE REDUCED</div>
          </div>
          <div style="background: #fef2f2; border-radius: 12px; padding: 20px; text-align: center; border: 2px solid #fecaca;">
            <div style="font-size: 32px; margin-bottom: 8px;">❤️</div>
            <div style="font-size: 14px; color: #991b1b; font-weight: 700;">LIVES IMPACTED</div>
          </div>
        </div>

        <p style="margin: 35px 0 0 0; font-size: 15px; color: #6b7280; text-align: center; font-style: italic; line-height: 1.6;">
          "The best way to find yourself is to lose yourself in the service of others."<br/>
          <span style="font-size: 13px; font-weight: 600;">— Mahatma Gandhi</span>
        </p>
      </div>

      <!-- Footer -->
      <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); padding: 35px; text-align: center;">
        <div style="font-size: 40px; margin-bottom: 15px;">🌱</div>
        <h3 style="margin: 0 0 10px 0; color: #1e293b; font-size: 22px; font-weight: 700;">
          <a href = "https://resqfood-cc.vercel.app" style="color: #93c10aff" >ResQFood</a>
        </h3>
        <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.8;">
          Saving Food, Serving Hope 🌍<br/>
          <span style="font-size: 13px; font-weight: 600; color: #3b82f6;">Thank you for being part of the solution!</span>
        </p>
      </div>
    </div>
  </div>
  `;
};