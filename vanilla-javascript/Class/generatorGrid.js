//Table class'ından türettiğimiz ikinci bir class'ımız olsun. Ve bu class table yerine css'le grid çizsin.
class Grid extends Table {
  //rowsNumber ve columnsNumber özellikleri Table classından miras alınıyor.
  constructor(rowsNumber, columnsNumber) {
    super(rowsNumber, columnsNumber);
  }
  //Oluşturulan class'tan nesne üretmeye gerek kalmadan oluşturduğumuz metodu kullanabilmek için, metodu static olarak ekledim.
  //Bu metoda Table class'ında ki createGrid metoduyla aynı isim verilip, içi bu classta farklı tanımlanarak farklı işlev veriliyor.
  static createGrid() {
    //Grid'in çizileceği container'ı seçmek. Kutular burda dizilecek.
    const container = document.getElementById("container");
    //Sayfa yenilenmeden ikinci bir grid oluşturulmak istenirse, önceki grid'in üstüne yazmaması için fonksiyon her çalıştığında ilk başta boş değer üzerinden ilerliyor.
    container.innerHTML = "";

    //Grid'in çizileceği container'a setProperty ile kaç tane kutu olacağını iletmek. İlk değer css üzerinden custom oluşturduğumuz ve 1 atadığımız değer.
    //İkinci değer ise inputtan gelen değer. setProperty ile oluşturduğumuz css değerini inputtan gelecek olan değere eştliyoruz.
    //Yani inputlardan ne değer gelirse --grid-rows ve --grid-cols css'deki 1 yerine inputtaki değerleri alacak.
    container.style.setProperty("--grid-rows", this.rowsNumber);
    container.style.setProperty("--grid-cols", this.columnsNumber);

    //Input değerine girilen sayılar kadar grid çizilmesi için input değerlerini çarpıp çıkan sonuca kadar dönüyoruz.
    for (let c = 0; c < this.rowsNumber * this.columnsNumber; c++) {
      //Gridlerimizi div ile oluşturmak için div oluşturuyoruz.
      let cell = document.createElement("div");

      //Oluşturduğumuz divlerin içine kaçıncı div olduğunu yazmak
      cell.innerText = c + 1;

      //Grid'ın gösterilmesi için yukarda seçtiğimiz container'a, oluşturduğumuz divleri eklemek ve classlarını css'imizde ki "grid-item" yapmak.
      container.appendChild(cell).className = "grid-item";

      // Oluşturulan divin içine input eklemek için input elementi oluşturuluyor.
      let checkbox = document.createElement("input");
      // Input elementinin tipi checkbox olarak ayarlanıyor.
      checkbox.type = "checkbox";
      // Input elementi oluşturulan divin içine ekleniyor ve class ismi olarak checkbox veriliyor.
      cell.appendChild(checkbox).className = "checkbox";

      // Oluşturulan divin içine input eklemek için input elementi oluşturuluyor.
      let input = document.createElement("input");
      // Input elementinin tipi text olarak ayarlanıyor.
      input.type = "text";
      // Input elementi oluşturulan divin içine ekleniyor.
      cell.appendChild(input);
    }
  }
}
//Metodumuzu çalıştırmak için eventlistener ataması yapmak. Static metod olduğu için direkt class üzerinden çağırılabilir.
document
  .querySelector(".button-table-generator")
  .addEventListener("click", () => {
    Grid.createGrid();
    console.log((b = new Grid()));
  });
