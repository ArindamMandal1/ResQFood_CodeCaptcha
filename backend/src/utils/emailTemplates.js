export const foodClaimedOwnerTemplate = ({ food, ngo, restaurant }) => {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#667eea;padding:20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;">
          
          <tr>
            <td style="background:#1e3a8a;color:#ffffff;padding:24px;text-align:center;">
              <div style="font-size:48px;">🎉</div>
              <h2 style="margin:10px 0;font-size:24px;">Your Food Was Claimed!</h2>
              <p style="margin:0;font-size:14px;">Making a difference, one meal at a time</p>
            </td>
          </tr>

          <tr>
            <td style="padding:20px;font-size:14px;color:#1f2937;">
              <p>Hello <b>${restaurant.name}</b>,</p>
              <p>Your food donation was claimed by <b>${ngo.name}</b>. Thank you for your generosity!</p>

              <table width="100%" style="background:#f0fdf4;border-radius:12px;padding:16px;">
                <tr><td><b>🍽 Food:</b> ${food.food_name}</td></tr>
                <tr><td><b>📦 Quantity:</b> ${food.quantity}</td></tr>
                <tr><td><b>⏰ Expiry:</b> ${new Date(food.expiry_time).toLocaleString()}</td></tr>
              </table>

              <img src="${food.food_image?.[0]?.url}" style="width:100%;height:auto;border-radius:12px;margin:16px 0;" />

              <a href="https://www.google.com/maps?q=${food.location.coordinates[1]},${food.location.coordinates[0]}"
                style="display:block;width:100%;text-align:center;background:#22c55e;color:#ffffff;padding:14px;border-radius:10px;text-decoration:none;font-weight:bold;">
                📍 View Pickup Location
              </a>
            </td>
          </tr>

          <tr>
            <td style="background:#f1f5f9;padding:16px;text-align:center;font-size:13px;color:#64748b;">
              <b>ResQFood</b><br/>Saving Food, Serving Hope 🌱
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
  `;
};
export const foodClaimedNgoTemplate = ({ food, restaurant }) => {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#10b981;padding:20px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:600px;background:#ffffff;border-radius:16px;">
          
          <tr>
            <td style="background:#16a34a;color:#fff;padding:24px;text-align:center;">
              <div style="font-size:48px;">✅</div>
              <h2 style="margin:10px 0;font-size:24px;">Food Claimed Successfully</h2>
            </td>
          </tr>

          <tr>
            <td style="padding:20px;font-size:14px;">
              <p><b>Food:</b> ${food.food_name}</p>
              <p><b>Quantity:</b> ${food.quantity}</p>
              <p><b>Donor:</b> ${restaurant.name}</p>
              <p><b>Collect Before:</b> ${new Date(food.expiry_time).toLocaleString()}</p>

              <img src="${food.food_image?.[0]?.url}" style="width:100%;height:auto;border-radius:12px;margin:16px 0;" />

              <a href="https://www.google.com/maps?q=${food.location.coordinates[1]},${food.location.coordinates[0]}"
                style="display:block;width:100%;text-align:center;background:#16a34a;color:#ffffff;padding:14px;border-radius:10px;text-decoration:none;font-weight:bold;">
                📍 Navigate to Pickup Location
              </a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
  `;
};
export const foodCollectedNgoTemplate = ({ food, restaurant }) => {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#22c55e;padding:20px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:600px;background:#ffffff;border-radius:16px;">
          
          <tr>
            <td style="background:#16a34a;color:#fff;padding:24px;text-align:center;">
              <div style="font-size:48px;">🌟</div>
              <h2 style="margin:10px 0;">Mission Accomplished!</h2>
            </td>
          </tr>

          <tr>
            <td style="padding:20px;text-align:center;font-size:14px;">
              <p>You collected <b>${food.food_name}</b> from <b>${restaurant.name}</b>.</p>
              <p>Thank you for making a difference ❤️</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
  `;
};
export const foodCollectedOwnerTemplate = ({ food, ngo }) => {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#3b82f6;padding:20px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:600px;background:#ffffff;border-radius:16px;">
          
          <tr>
            <td style="background:#1e3a8a;color:#fff;padding:24px;text-align:center;">
              <div style="font-size:48px;">🎊</div>
              <h2 style="margin:10px 0;">Donation Complete</h2>
            </td>
          </tr>

          <tr>
            <td style="padding:20px;font-size:14px;text-align:center;">
              <p>Your food <b>${food.food_name}</b> was collected by:</p>
              <p><b>${ngo.name}</b></p>
              <p>Thank you for helping reduce food waste 🌱</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
  `;
};
