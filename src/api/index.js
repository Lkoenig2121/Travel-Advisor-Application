import axios from 'axios';

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

export const getPlacesData = async (bounds /*, sw, ne */) => {
    try {
        const { data: { data } } = await axios.get(URL, {
            params: {
              bl_latitude: bounds.sw.lat,
              tr_latitude: bounds.ne.lat,
              bl_longitude: bounds.sw.lng,
              tr_longitude: bounds.ne.lng,
            },
            headers: {
              'X-RapidAPI-Key': '0bc3fb4cb4mshf35ee6c037c44fap1a3f14jsn2329d558b285',
              'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
          });

        return data
    } catch (error) {
        console.log(error)
    }
}
