class Table {
  //Class'ın dışardan değiştirilmesini istemediğimiz bir isim özelliği olsun. Bu yüzden private metodla ismi belirliyorum.
  #name = "Grid Generator";
  // row ve column özellikleri. Bunlar inputlara girilecek olan değerler.Tam sayı olarak almak için parseInt
  constructor(rowsNumber, columnsNumber) {
    this.rowsNumber = parseInt(document.querySelector(".rows").value);
    this.columnsNumber = parseInt(document.querySelector(".columns").value);
  }

  //Class'ın isim özelliğini çağırmak için
  get tableGeneratorName() {
    return this.#name;
  }

  //Class'ın isim özelliğini set metoduyla belirlediğimiz ölçülerde, ne kadar değişmesine müsade etmek istediğimize göre şartlıyoruz.
  //name hem private özellik olduğundan dışardan erişilip değiştirilemeyecek
  //hem de eğer değiştirilirse de belirlediğimiz ölçütler olan "yazı olmalı" ve "20 karakterden küçük olmalı" şartlarının dışına çıkamayacak.
  set tableGeneratorName(value) {
    if (typeof value === "string" && value.length <= 20) {
      this.#name = value;
    } else {
      throw "Generator ismi sadece 20 karakterden küçük yazı olabilir.";
    }
  }

  //Oluşturulan class'tan nesne üretmeye gerek kalmadan oluşturduğumuz metodu kullanabilmek için, metodu static olarak ekledim.
  static createGrid = () => {
    //Sayfa yenilenmeden ikinci bir table oluşturulmak istenirse, önceki table'ın üstüne yazmaması için fonksiyon her çalıştığında ilk başta boş değer üzerinden ilerliyor.
    let tableHTML = "";

    //row ve colum inputlarının değerlerini seçmek ve parseInt'le eğer ondalıklı sayı girilirse tam sayıya çevirmek.
    this.rowsNumber = parseInt(document.querySelector(".rows").value);
    this.columnsNumber = parseInt(document.querySelector(".columns").value);

    //Row inputuna girilen değere kadar dönmek
    for (let r = 1; r <= this.rowsNumber; r++) {
      let tr = "<tr>";
      //Column inputuna girilen değere kadar dönmek. Row'la içiçeler ki senkronize şekilde iki farklı input değerine göre kutular oluşsun.
      for (let c = 1; c <= this.columnsNumber; c++) {
        //Hem toplam kutu sayısına ulaşmak, hemde kutulara kendi sayılarını vermek için, r ve c değerlerini input değerlerine kadar çarpmak.
        //Örneğin ilk satır 1*1 1*2 1*3, ikinci satır 2*1 2*2 2*3 gibi.
        //Örnek olarak içine input konuldu, isteğe göre özelleştirilebilir.
        const cellContent = r * c;
        let td = `<td>${cellContent}
       <input class="checkbox" type="checkbox"> <input type="text">
        </td>`;
        //Table içini doldurmak
        tr += td;
      }
      //Yukarda boş olarak oluşturulan tableHTML, artık oluşturulan değerleri sürekli üstüne koyarak table'ı oluşturuyor.
      tableHTML += tr;
    }
    //İnput değerine göre oluşacak olan table'ın gözükmesi için table komponentinin innerHTML'ini tableHTML değerimize eşitliyoruz.
    document.querySelector(".table").innerHTML = tableHTML;
  };
}

//Metodumuzu çalıştırmak için eventlistener ataması yapmak. Static metod olduğu için direkt class üzerinden çağırılabilir.
document
  .querySelector(".button-table-generator")
  .addEventListener("click", () => {
    Table.createGrid();
    console.log((a = new Table()));
  });

//name özelliğinin doğruluğunu kontrol etmek için
const firstTableGenerator = new Table();
console.log(firstTableGenerator);

firstTableGenerator.tableGeneratorName = "caner";
console.log(firstTableGenerator);
firstTableGenerator.tableGeneratorName = 123;
