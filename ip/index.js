//axios import buraya gelecek

var benimIP;


// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl() {
	await axios({
		method: 'get',
		url: 'https://apis.ergineer.com/ipadresim',
	})
		.then(function (response) {
			return response.data
		})
		.then(function (a) {
			benimIP = a
		});
}
// ------------ değiştirmeyin --------------


/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
	(tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
	https://apis.ergineer.com/ipgeoapi/<ipniz>
	
	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim 
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/

/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	
*/
/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
	DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
	</div>
*/

/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/



//kodlar buraya gelecek

const cardCreator = (data) => {
	const card = document.createElement("div");
	card.classList.add("card");

	const flag = document.createElement("img");
	flag.setAttribute("src", data?.["country-flag"]);
	card.append(flag);

	const cardInfo = document.createElement("div");
	cardInfo.classList.add("card-info");
	card.append(cardInfo);

	const title = document.createElement("h3");
	title.classList.add("ip");
	title.textContent = `IP: ${data?.query}`;
	cardInfo.append(title);

	const countryInfo = document.createElement("p");
	countryInfo.classList.add("country");
	countryInfo.textContent = `${data?.["country"]} (${data?.["country-code"]})`;
	cardInfo.append(countryInfo);
  
	const latLong = document.createElement("p");
	latLong.textContent = `Latitude: ${data?.latitude} Longitude: ${data?.longitude}`;
	cardInfo.append(latLong);
  
	const cityInfo = document.createElement("p");
	cityInfo.textContent = `City: ${data?.["city"]}`;
	cardInfo.append(sehirBilgi);
  
	const timeZone = document.createElement("p");
	timeZone.textContent = `Time zone: ${data?.timeZone}`;
	cardInfo.append(timeZone);
  
	const currency = document.createElement("p");
	currency.textContent = `Currency: ${data?.currency}`;
	cardInfo.append(currency);
  
	const ispInfo = document.createElement("p");
	ispInfo.textContent = `ISP: ${data?.isp}`;
	cardInfo.append(ispInfo);
  
	return card;
};

const listCard = () => {
	const cardContainer = document.querySelector(".cards");
	axios 
	.get("https://apis.ergineer.com/ipadresim")
	.then ((res)=>{
		 const ipAdress = res.data ;
		 console.log(ipAdress);
		axios
			.get(`https://apis.ergineer.com/ipgeoapi/${ipAdresi}`)
			.then((res) => {
				console.log(res);
				const cardInfo = cardCreator(res.data);
				cardContainer.append(cardInfo);
			})
	})
	.catch(err=>{
		console.log("error",err);
	});
	}
listCard();