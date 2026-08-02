# Sofra Sırları — Yemek Tarifleri Web Sitesi

Proje dokümanındaki tüm özelliklere göre hazırlanmış, **reklam alanları dahil** tam çalışan statik web sitesi. Herhangi bir sunucu veya veritabanı gerektirmez; sadece dosyaları bir web sunucusuna yükleyerek yayına alabilirsiniz.

## Nasıl Açılır?

Basitçe `index.html` dosyasını bir tarayıcıda açın. Tam işlevsellik (arama, favoriler, filtreler) için yerel bir sunucu önerilir:

```bash
# Proje klasöründe:
python3 -m http.server 8000
# Sonra tarayıcıda: http://localhost:8000
```

Yayına almak için tüm klasörü herhangi bir statik hosting'e (Cloudflare Pages, Netlify, Vercel, GitHub Pages, cPanel) yükleyin.

### Cloudflare Pages ile yayınlama (doğrudan yükleme — en kolay)
1. [dash.cloudflare.com](https://dash.cloudflare.com) → hesabınıza girin (yoksa ücretsiz açın).
2. Sol menüden **Workers & Pages** → **Create** → **Pages** sekmesi → **Upload assets**.
3. Projeye bir ad verin (örn. `sofra-sirlari`).
4. `sofra-sirlari` **klasörünün içindeki** dosyaları (index.html, css/, js/, tarifler/ ...) sürükleyip bırakın. Not: zip'i **açıp içindeki dosyaları** yükleyin; index.html en üst seviyede olmalı.
5. **Deploy site** → birkaç saniyede `https://sofra-sirlari.pages.dev` gibi bir adres alırsınız. SSL otomatik.

### Kendi alan adınızı bağlama
Proje yayınlandıktan sonra Pages projenizde **Custom domains** → **Set up a domain** ile kendi alan adınızı (örn. sofrasirlari.com.tr) ekleyin. Alan adınız Cloudflare'de ise DNS otomatik ayarlanır.

> Alan adınız `sofrasirlari.com.tr`'dan farklıysa: `sitemap.xml` ve sayfalardaki `<link rel="canonical">` / Open Graph URL'lerinde bu adı kendi alan adınızla değiştirin.

## İçerik

- **100 tarif** — dokümandaki listeyle birebir, 8 kategoriye dağılmış (Ana Yemekler 20, Tatlılar 20, diğerleri 10'ar)
- **100 tarif detay sayfası** — 21 bölümlük şablon: malzemeler, adım adım hazırlanış, püf noktaları, servis önerisi, saklama, besin değerleri, video alanı, SSS, benzer tarifler, yorumlar
- **8 kategori sayfası** — kendi SEO başlığı ve filtresiyle
- **12 blog yazısı** + blog listesi
- Ana sayfa, Tarifler (gelişmiş filtreleme), Favoriler
- Hakkımızda, İletişim, Gizlilik, Kullanım Koşulları, Çerez Politikası

## Reklam Alanları (Google AdSense'e hazır)

Doküman bölüm 19'daki tüm yerleşimler yer tutucu olarak eklenmiştir:
- Header altı yatay reklam (970×90)
- Tarif listesinde her 6 karttan sonra (728×90)
- Tarif detayda: giriş sonrası, malzeme–hazırlanış arası (300×250), tarif sonu
- Masaüstü sağ yan panel (300×600)
- Mobilde yapışkan alt reklam (320×50)

**Adsterra reklamlarını etkinleştirmek için:**
1. Siteyi yayınlayın ve Adsterra'ya (adsterra.com) yayıncı olarak kaydolun, sitenizi ekleyip onay alın.
2. Adsterra panelinde **her banner boyutu için ayrı bir reklam birimi** oluşturun. Sitenin kullandığı boyutlar:
   - `728x90` — header altı ve liste içi bannerlar
   - `300x250` — tarif içi (malzeme–hazırlanış arası) blok
   - `300x600` — masaüstü yan panel
   - `320x50` — mobil yapışkan alt banner
3. Her birim için Adsterra size bir **key** verir. Bu key'leri `js/site.js` dosyasının en üstündeki `window.ADSTERRA_KEYS` bloğuna ilgili boyutun karşısına yapıştırın:
   ```js
   window.ADSTERRA_KEYS = {
     "728x90":  "buraya_key",
     "300x250": "buraya_key",
     "300x600": "buraya_key",
     "320x50":  "buraya_key"
   };
   ```
4. Kaydedip yeniden yayınlayın. O boyuta ait tüm reklam alanları otomatik dolar. Boş bıraktığınız boyutlar "REKLAM ALANI" yer tutucusu olarak kalır (site bozulmaz).

Her banner kendi izole `<iframe>`'inde çalışır; böylece Adsterra script'leri birbiriyle ve sayfayla çakışmaz.

## SEO

- Her tarifte **Schema.org Recipe** yapılandırılmış verisi (Google zengin sonuçları için)
- Benzersiz SEO başlığı ve meta açıklaması
- Temiz URL yapısı, canonical etiketleri, Open Graph
- `sitemap.xml` (129 URL) ve `robots.txt` hazır

## Teknik Notlar

- Saf HTML + CSS + JavaScript (framework yok, bağımlılık yok)
- Tam responsive (mobil hamburger menü, tek sütun kartlar, yapışkan mobil reklam)
- Renk paleti ve tipografi dokümandaki değerlerle birebir
- Favoriler oturum içinde saklanır (`sessionStorage`)
- Erişilebilirlik: klavye odağı, `prefers-reduced-motion` desteği

## Görseller

Kartlarda ve kapaklarda şu an kategori emojili gradyan yer tutucular kullanılıyor. Gerçek fotoğrafları eklemek için `images/` klasörüne `{tarif-slug}.webp` formatında yükleyin ve kart/kapak `background`'larını bu görsellere yönlendirin (doküman bölüm 4'teki önerilen ölçüler: kart 800×600, kapak 1200×800).

## Dosya Yapısı

```
index.html              Ana sayfa
tarifler.html           Tüm tarifler + filtreler
favoriler.html          Favori tarifler
blog.html               Blog listesi
hakkimizda.html         Hakkımızda
iletisim.html           İletişim formu
gizlilik.html           Gizlilik politikası
kullanim-kosullari.html Kullanım koşulları
cerez-politikasi.html   Çerez politikası
sitemap.xml, robots.txt SEO dosyaları
css/style.css           Tüm stiller
js/recipes-data.js      100 tariflik veri
js/site.js              Header/footer, arama, favoriler
tarifler/               100 tarif detay sayfası
kategori/               8 kategori sayfası
blog/                   12 blog yazısı
images/                 Görseller (buraya ekleyin)
```
