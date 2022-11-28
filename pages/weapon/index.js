import React,{useState,useEffect} from 'react'
import axios from 'axios'


import weaponStyle from  '../../styles/Weapon.module.css'


function index({ weaponData2}) {

  const [weaponAllData , setAllWeaponData] = useState([])
  const [weaponData , setWeaponData] = useState({})

  const [waeponCategory , setWeaponCategory] = useState(['Shotguns','Heavy Weapons','SMGs','Sniper Rifles','Pistols','Rifles','Melee'])
  const [waeponCategoryImage , setWeaponCategoryImage] = useState([])




  async function getAllWeaponData(){
     await axios.get("https://valorant-api.com/v1/weapons").then((res)=>{
      setAllWeaponData(res.data.data) 
     })
   }

   async function getWeaponData(uuid){
     await axios.get(`https://valorant-api.com/v1/weapons/${uuid}`).then((res)=>{
       setWeaponData(res.data.data) 
     })
   }

   
   useEffect(()=>{
    weaponData2.map((item,i)=>{
      item.displayIcon ? setWeaponCategoryImage(waeponCategoryImage => [...waeponCategoryImage,item.displayIcon]) : ""

    });

    setWeaponCategory(waeponCategory => [...new Set(waeponCategory)] )
    setWeaponCategoryImage(waeponCategoryImage => [...new Set(waeponCategoryImage)] )

    

    },[weaponData]) 

    console.log(weaponData2)


  return (
    <div className={weaponStyle.main}>
        
        <div className={weaponStyle.weapon_container_category}>

            {waeponCategory.map((category) => 
             (
              <>
              <div className={weaponStyle.weapon_section}>

              <h4 className={weaponStyle.weapon_category_name}>{category}</h4>

                {weaponData2.map((item , i) => {
                  if(category === (item.shopData ? item.shopData.category : '') || category === item.displayName){
                    return (
                      <div className={weaponStyle.weaponImageWraper}>
                        <img src={waeponCategoryImage[i]} className={category === 'Pistols' ? weaponStyle.weapon_category_image_resize : weaponStyle.weapon_category_image} onClick={()=> getWeaponData(item.uuid)}/>
                      </div>
                       )
                  }
                }   
                
                )
                }
            </div>
              </>
             )
              )}

</div>

    
    <div className={weaponStyle.weapon_category_selected}>
        <h1>{weaponData.displayName}</h1>
        <img className={weaponStyle.weapon_display} src={weaponData.displayIcon}/>
    </div>
    
    {/* -------------------------------------- */}

  <section className={weaponStyle.weapon_skin_section}>
      {weaponData.skins ? weaponData.skins.map((item,i) => {

        let checkNullImage = item.displayName.split(' ')[0];

        if(checkNullImage !== 'Standard' && checkNullImage !== 'Random'){
        return  <div className={weaponStyle.weapon_skin_item}>
            <span className={weaponStyle.weapon_skin_item_name} key={`skin${i}`}>{item.displayName}</span> 
            <img src={item.chromas[0].fullRender}/>
        </div>
        }
      }
      ) : 'Loading'}

    </section>
    </div>
  )
}
 
export async function getServerSideProps() {

  let weaponData2 = await axios.get("https://valorant-api.com/v1/weapons/").then((res)=>{
      return res.data.data
  })

  return { props: { weaponData2 } } 
} 




export default index
