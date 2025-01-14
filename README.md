Opis architektury
Projekt wykorzystuje architekturę mikroserwisów, gdzie każda funkcjonalność aplikacji jest realizowana przez oddzielny, autonomiczny serwis. Każdy mikroserwis odpowiada za jeden obszar aplikacji i komunikuje się z innymi mikroserwisami za pomocą protokołów sieciowych (np. HTTP/REST). W tym przypadku mamy trzy główne mikroserwisy:

AuthService – odpowiedzialny za zarządzanie autoryzacją i uwierzytelnianiem użytkowników.
OrderService – zajmuje się obsługą zamówień, w tym składaniem nowych zamówień i ich przetwarzaniem.
ProductService – odpowiedzialny za zarządzanie produktami, w tym ich listowanie i wyszukiwanie w systemie.
Każdy z tych serwisów ma własny kod, który jest niezależny od innych, co oznacza, że są one rozwijane i skalowane niezależnie. Dzięki takiej strukturze, każdy mikroserwis może być rozwijany i wdrażany samodzielnie, co ułatwia zarządzanie i utrzymanie systemu.

Struktura folderów i plików
Zawartość projektu odpowiada standardowej strukturze mikroserwisów, w której każdy serwis ma własną przestrzeń w projekcie.

/api – zawiera główne serwisy backendowe, takie jak AuthService, OrderService, i ProductService. Każdy z tych serwisów ma swoją logikę biznesową, a także zbiory plików konfiguracyjnych, które są używane do skonfigurowania połączeń z bazą danych oraz serwisami.

/public – publiczny folder, który zawiera zasoby statyczne, takie jak obrazy, pliki JavaScript i CSS, a także pliki konfiguracyjne (np. index.html, manifest.json).

/src/components – zawiera komponenty frontendowe, które odpowiadają za interakcję użytkownika z aplikacją, takie jak formularze logowania, rejestracji, przyciski logowania, produkty itp. Komponenty te są zorganizowane według typu (np. AuthButton, CartItem, ProductTile).

/tests – zawiera testy jednostkowe, które są przeznaczone do testowania poszczególnych mikroserwisów. W folderze tym znajdują się testy dla AuthService, OrderService oraz ProductService.

/Dockerfile – pliki konfiguracyjne Docker, które umożliwiają uruchomienie mikroserwisów w kontenerach. Każdy serwis (np. AuthService, OrderService, ProductService) ma swój własny plik Dockerfile, co pozwala na izolację poszczególnych mikroserwisów.

/dataBase – folder, który zawiera skrypty SQL do tworzenia tabel i inicjalizacji bazy danych, dla każdego serwisu (np. book_shop_authors.sql, book_shop_carts.sql, itd.).


Baza danych

Baza danych, której strukturę przedstawia poniższy dump, dotyczy sklepu internetowego z książkami. Zawiera informacje o książkach (produkty), autorach, klientach, koszykach zakupowych oraz ocenach książek. Baza ta jest zapisana w systemie MySQL, z użyciem silnika InnoDB, który zapewnia obsługę transakcji, integralność danych i referencje między tabelami. Charakterystyczną cechą tego projektu jest zachowanie poprawnej relacji między tabelami (np. powiązanie produktów z autorami i gatunkami książek).

Tabele w bazie danych:

Tabela authors – zawiera dane dotyczące autorów książek, z polami: ID (klucz główny), imię i nazwisko.
Tabela carts – przechowuje informacje o koszykach klientów, z polami: ID (klucz główny), product_id (identyfikator książki), client_id (identyfikator klienta), status oraz ilość.
Tabela clients – zawiera dane o klientach sklepu, w tym login i zaszyfrowane hasło.
Tabela genres – przechowuje informacje o gatunkach książek, takie jak ID i nazwa gatunku.
Tabela products – zawiera dane o książkach w ofercie sklepu, takie jak: ID, nazwa, cena, ścieżka do zdjęcia, ID gatunku i autora, średnia ocena.
Tabela rates – (choć fragment jest niekompletny) – przechowuje oceny książek wystawione przez klientów.
Uzasadnienie organizacji bazy danych:
Normalizacja danych: Struktura bazy danych jest zaprojektowana zgodnie z zasadami normalizacji, aby uniknąć redundancji i zapewnić integralność danych. Na przykład, autorzy i gatunki książek są przechowywane w oddzielnych tabelach, a ich powiązania z książkami odbywają się za pomocą kluczy obcych. Dzięki temu każda książka ma przypisane unikalne ID autora oraz gatunku, co umożliwia łatwiejsze zarządzanie i modyfikowanie tych danych.

Optymalizacja dla relacji między danymi: Przechowywanie informacji o klientach, książkach, autorach i koszykach w osobnych tabelach umożliwia łatwe i szybkie zapytania dotyczące zakupów, historii ocen czy katalogu produktów. Na przykład, tabela carts przechowuje powiązania produktów z klientami, co pozwala na szybkie generowanie raportów i analiz.

Zabezpieczenie danych: Hasła klientów są przechowywane w sposób bezpieczny za pomocą funkcji haszowania, co zapobiega nieautoryzowanemu dostępowi do wrażliwych informacji.

InnoDB jako silnik bazy danych: Użycie silnika InnoDB pozwala na obsługę transakcji, co jest istotne w kontekście operacji związanych z zakupami. Dzięki temu, np. w przypadku problemów z połączeniem, wszystkie operacje związane z koszykiem lub zakupem książki mogą być wycofane, zapewniając spójność danych.

Rozszerzalność bazy danych: Zorganizowana struktura bazy umożliwia łatwe dodawanie nowych funkcjonalności, jak np. obsługa nowych kategorii książek, zmiana struktury ocen, czy dodawanie nowych tabel (np. recenzje, promocje).

Użycie kodowania UTF-8MB4: Baza danych wykorzystuje kodowanie UTF-8MB4, które obsługuje pełen zakres znaków, co jest ważne w kontekście przechowywania nazw autorów, tytułów książek czy opinii w różnych językach.

Serwisy -> AuthService:

1. AuthService (klasa serwisu)
Zadanie: Klasa AuthService odpowiada za zarządzanie autentykacją użytkowników, zapewniając funkcje takie jak logowanie, rejestracja użytkowników oraz walidacja tokenów JWT.

Metody:

loginUser($email, $password):
Funkcja ta sprawdza dane logowania użytkownika.
Jeśli dane są poprawne, generowany jest token JWT, który pozwala na uwierzytelnienie użytkownika w późniejszych żądaniach.
W przypadku nieprawidłowych danych zwracany jest komunikat o błędzie.
addClient($login, $password):
Służy do rejestracji nowego użytkownika w systemie.
Sprawdza, czy użytkownik o danym loginie już istnieje, a jeśli nie, to dodaje go do bazy danych.
Zwraca odpowiednią odpowiedź w zależności od wyniku operacji.
generateToken($userId, $login):
Generuje token JWT na podstawie danych użytkownika. Token jest podpisany przy użyciu tajnego klucza oraz zawiera informacje o użytkowniku, takie jak ID, login oraz czas wygaśnięcia tokena.
validateToken($token):
Służy do weryfikacji poprawności tokena JWT.
Jeżeli token jest ważny, funkcja zwraca jego dekodowaną zawartość, w przeciwnym razie zwraca null, co oznacza, że token jest niepoprawny lub wygasł.
2. Plik konfiguracyjny (config.php)
W pliku config.php przechowywane są ustawienia, takie jak:

jwt_secret: Tajny klucz, który służy do podpisywania tokenów JWT.
jwt_issuer: Określa nazwę aplikacji lub organizacji, która wystawia tokeny JWT.
jwt_expiration_time: Określa czas życia tokenu w sekundach.
Przechowywanie tych informacji w osobnym pliku konfiguracyjnym jest dobrą praktyką, ponieważ umożliwia łatwe zarządzanie ustawieniami i zmianę ich bez konieczności edytowania głównego kodu aplikacji.

3. Plik Dockerfile
Plik Dockerfile opisuje, jak przygotować środowisko kontenera dla aplikacji. Dzięki temu:

Instalujemy wymagane zależności, takie jak libpq-dev, libonig-dev oraz rozszerzenia PHP do obsługi bazy danych MySQL (pdo, pdo_mysql).
Kopiujemy pliki aplikacji do kontenera, a także instalujemy zależności PHP poprzez Composer.
Konfigurujemy aplikację do uruchomienia na porcie 80, używając wbudowanego serwera PHP.
4. Plik główny (entry-point)
W tym pliku mamy punkt wejścia aplikacji, który obsługuje zapytania HTTP:

Ładuje konfigurację i tworzy połączenie z bazą danych MySQL.
Tworzy instancję serwisu AuthService, który będzie odpowiedzialny za wykonanie logiki autentykacji.
Obsługuje różne akcje:
login: Wykonuje logowanie użytkownika.
register: Rejestruje nowego użytkownika.
validateToken: Waliduje token JWT.

Serwisy -> OrderService:

1. OrderService (serwis)
Zadanie: Klasa OrderService odpowiedzialna jest za logikę związaną z operacjami na zamówieniach, takimi jak dodawanie nowych zamówień oraz pobieranie zamówień dla określonego klienta.

Metody:

addOrder($product_id, $client_id, $status, $amount):
Służy do dodawania nowego zamówienia do bazy danych. Przyjmuje dane zamówienia (ID produktu, ID klienta, status oraz ilość).
Jeśli operacja zakończy się pomyślnie, zwraca status "success" z odpowiednią wiadomością.
W przypadku błędu (np. problemów z bazą danych) zwraca status "error" z opisem błędu.
getOrdersByClientId($client_id):
Ta metoda pozwala na pobranie zamówień z bazy danych na podstawie ID klienta.
Jeśli zapytanie zakończy się powodzeniem, zwraca dane zamówień w formie tablicy.
Jeśli wystąpi błąd, zwróci komunikat o błędzie.
2. OrderController (kontroler)
Zadanie: Klasa OrderController pełni rolę pośrednika między żądaniami HTTP a serwisem OrderService. Jest odpowiedzialna za delegowanie zapytań do serwisu oraz odpowiednie zwracanie wyników użytkownikowi.

Metody:

getOrders($client_id):
Kontroler przyjmuje identyfikator klienta, wywołuje metodę getOrdersByClientId z serwisu OrderService, a następnie zwraca wynik w formacie JSON.
Jeśli operacja zakończy się powodzeniem, użytkownik otrzymuje dane zamówień w formie JSON.
Jeśli wystąpi błąd, użytkownik otrzyma odpowiedź z komunikatem o błędzie.
3. Konfiguracja środowiska w Dockerze
Plik Dockerfile:
Konfiguracja aplikacji w kontenerze Docker zapewnia odpowiednie środowisko do uruchomienia aplikacji PHP.
Wymagane zależności, takie jak pdo i pdo_mysql, są instalowane, a aplikacja jest uruchamiana na porcie 80.
Skopiowanie plików aplikacji i uruchomienie composer install pozwala na łatwą instalację wszystkich zależności PHP.
4. Połączenie z bazą danych
Połączenie z MySQL:
W kodzie PHP, przy pomocy obiektu PDO, następuje nawiązanie połączenia z bazą danych book_shop. Jeśli połączenie jest nieudane, aplikacja zwraca komunikat o błędzie.
Połączenie z bazą danych jest używane zarówno w serwisie OrderService, jak i w innych częściach aplikacji.
5. Plik Composer (composer.json)
W pliku composer.json określono zależności wymagane do działania aplikacji:

php: Określenie wersji PHP.
ext-pdo: Wymagana rozszerzenie PHP do obsługi połączeń z bazą danych za pomocą PDO.

Serwisy -> ProductService:

1. ProductService (Serwis)

Opis: ProductService odpowiada za zarządzanie produktami w systemie, w tym za pobieranie danych o produktach z bazy danych. Korzysta z PDO do wykonywania zapytań SQL, zapewniając bezpieczeństwo i wydajność.

Metoda:

getProducts(): Pobiera listę produktów z bazy danych i zwraca je w formie tablicy. Obsługuje błędy bazodanowe oraz brak wyników.

2. Kontroler (PHP Script Obsługujący Endpointy)

Opis: Skrypt PHP odbiera żądania HTTP, deleguje je do odpowiednich metod serwisowych, a następnie zwraca dane w formacie JSON.

Działanie:

Żądanie /products wywołuje metodę getProducts() z ProductService i zwraca dane o produktach.
Obsługuje błędy bazodanowe i inne problemy.

3. Dockerfile (Środowisko Aplikacji)

Opis: Plik Dockerfile definiuje środowisko PHP, instaluje zależności (np. pdo, pdo_mysql), kopiuje aplikację i uruchamia ją na porcie 80.


Opis Serwisów oraz Uzasadnienie Organizacji Kodu
1. ProductService (Serwis)

Opis: ProductService odpowiada za zarządzanie produktami w systemie, w tym za pobieranie danych o produktach z bazy danych. Korzysta z PDO do wykonywania zapytań SQL, zapewniając bezpieczeństwo i wydajność.

Metoda:

getProducts(): Pobiera listę produktów z bazy danych i zwraca je w formie tablicy. Obsługuje błędy bazodanowe oraz brak wyników.
Uzasadnienie:

Modularność: Oddzielna logika dla produktów zapewnia łatwą rozbudowę aplikacji.
Bezpieczeństwo: Użycie PDO zapobiega atakom SQL Injection.
Izolacja logiki: Oddzielny serwis ułatwia zarządzanie kodem i jego modyfikacje.
2. Kontroler (PHP Script Obsługujący Endpointy)

Opis: Skrypt PHP odbiera żądania HTTP, deleguje je do odpowiednich metod serwisowych, a następnie zwraca dane w formacie JSON.

Działanie:

Żądanie /products wywołuje metodę getProducts() z ProductService i zwraca dane o produktach.
Obsługuje błędy bazodanowe i inne problemy.
Uzasadnienie:

Prostota: Skrypt pełni rolę routera, co upraszcza rozbudowę aplikacji.
Łatwość integracji: JSON umożliwia łatwą integrację z frontendem.
3. Dockerfile (Środowisko Aplikacji)

Opis: Plik Dockerfile definiuje środowisko PHP, instaluje zależności (np. pdo, pdo_mysql), kopiuje aplikację i uruchamia ją na porcie 80.

Uzasadnienie:

Izolacja: Docker zapewnia spójne środowisko uruchomieniowe.
Automatyzacja: Łatwe wdrożenia dzięki zautomatyzowanym krokom w pliku Dockerfile.
4. Połączenie z Bazą Danych MySQL (PDO)

Opis: Połączenie z bazą danych realizowane jest za pomocą PDO, zapewniając bezpieczeństwo i wydajność. 

5. Plik Composer (composer.json)

Opis: Plik composer.json definiuje wymagania PHP oraz zależności aplikacji, takie jak pdo do obsługi bazy danych.

Testowanie:

1. Testowanie rejestracji użytkowników
Testy: testRegisterUser i testRegisterDuplicateUser
Opis: Pierwszy test sprawdza, czy użytkownik został pomyślnie zarejestrowany, a dane są poprawnie zapisywane w bazie. Drugi test sprawdza sytuację, w której próba rejestracji tego samego użytkownika kończy się błędem.
Uzasadnienie: Testowanie tego procesu zapobiega błędom w rejestracji i gwarantuje, że system nie pozwoli na duplikowanie użytkowników, co mogłoby prowadzić do problemów w aplikacji.
2. Testowanie logowania użytkowników
Test: testLoginUser
Opis: Test weryfikuje, czy użytkownik z poprawnymi danymi logowania otrzymuje token, a przy niepoprawnych danych system zwraca odpowiedni błąd.
Uzasadnienie: Zapewnienie poprawności działania mechanizmu logowania jest niezbędne dla bezpieczeństwa systemu. Testy pomagają upewnić się, że logowanie działa zgodnie z oczekiwaniami, a błędne dane są odpowiednio obsługiwane.
3. Testowanie weryfikacji tokenów
Test: testValidateToken
Opis: Test sprawdza, czy wygenerowany token jest poprawnie weryfikowany przez system, a także czy system odrzuca nieprawidłowe tokeny.
Uzasadnienie: Walidacja tokenów jest kluczowa dla bezpieczeństwa aplikacji, ponieważ gwarantuje, że dostęp do chronionych zasobów jest możliwy tylko dla użytkowników posiadających ważne tokeny.
4. Testowanie dodawania zamówień
Test: testAddOrder
Opis: Test sprawdza, czy nowe zamówienie jest prawidłowo dodawane do bazy danych oraz czy zwracane są odpowiednie komunikaty o sukcesie.
Uzasadnienie: Poprawne dodawanie zamówień jest podstawą działania sklepu internetowego. Test zapewnia, że proces składania zamówień działa bezbłędnie.
5. Testowanie pobierania zamówień po ID klienta
Test: testGetOrdersByClientId
Opis: Test weryfikuje, czy system prawidłowo zwraca zamówienia przypisane do klienta, a także czy dane są zgodne z oczekiwaniami.
Uzasadnienie: Gwarantowanie, że klient może zobaczyć swoje zamówienia, jest kluczowe dla doświadczenia użytkownika. Testy pomagają upewnić się, że system działa zgodnie z wymaganiami biznesowymi.
6. Testowanie zarządzania produktami
Testy: testGetProductsReturnsProducts, testGetProductsReturnsEmpty, testGetProductsDatabaseError
Opis: Pierwszy test weryfikuje, czy produkty są poprawnie pobierane z bazy danych i prezentowane w odpowiedniej strukturze. Drugi test sprawdza, czy system poprawnie obsługuje brak produktów, a trzeci test testuje, jak system reaguje na błędy bazy danych.
Uzasadnienie: Testowanie zarządzania produktami pozwala upewnić się, że aplikacja prawidłowo wyświetla produkty oraz odpowiednio reaguje na błędy, takie jak brak produktów w bazie lub problemy z bazą danych.
7. Uzasadnienie przeprowadzania testów
Poprawność kodu: Testy pomagają wykryć błędy w logice aplikacji, które mogą prowadzić do nieprawidłowego działania funkcji, takich jak rejestracja, logowanie, czy obsługa zamówień.
Bezpieczeństwo: Testy, szczególnie te związane z logowaniem i tokenami, zapewniają, że aplikacja nie jest podatna na ataki, takie jak próby nieautoryzowanego dostępu.
Utrzymanie jakości: Regularne testowanie zapewnia, że aplikacja działa zgodnie z oczekiwaniami po każdej modyfikacji kodu, co minimalizuje ryzyko wprowadzenia nowych błędów podczas rozwoju projektu.
Automatyzacja: Testy umożliwiają automatyczne sprawdzanie funkcjonalności aplikacji przy każdej zmianie, co przyspiesza proces rozwoju i wdrożenia nowych wersji aplikacji.


Front-end -> Kluczowe komponenty: 
1. AuthButton
Przycisk, który zmienia swoje zachowanie w zależności od stanu użytkownika (zalogowany/niezalogowany).
Jeśli użytkownik jest zalogowany, przekierowuje do strony głównej /home.
Jeśli użytkownik nie jest zalogowany, pokazuje okno logowania/rejestracji.
Używa komponentu AuthPopup do wyświetlania formularzy logowania i rejestracji.
2. AuthPopup
Wyświetla okno modalne z formularzami logowania i rejestracji.
Zawiera dwa formularze: LoginForm i RegisterForm.
Obsługuje zarówno proces logowania, jak i rejestracji, oraz zamyka popup po udanym logowaniu.
3. LoginForm
Formularz logowania użytkownika.
Po udanym logowaniu, przekazuje dane użytkownika do funkcji handleLoginSuccess, ustawia stan zalogowania i zamyka popup.
4. RegisterForm
Formularz rejestracji, w którym użytkownik podaje email, hasło i jego potwierdzenie.
Po udanej rejestracji, użytkownik jest automatycznie logowany i dane są przekazywane do głównego stanu aplikacji.
5. Cart
Komponent zarządzający koszykiem, wyświetlający produkty dodane do koszyka.
Umożliwia zwiększanie/zmniejszanie ilości produktów oraz ich usuwanie.
Oblicza całkowitą wartość koszyka.
Umożliwia złożenie zamówienia, ale tylko dla zalogowanych użytkowników.
6. CartItem
Element pojedynczego produktu w koszyku.
Zawiera dane o produkcie (np. cena, autor, wydawca, gatunek) oraz przyciski do zmiany ilości i usuwania przedmiotu.
7. ProductTile
Komponent wyświetlający pojedynczy produkt.
Zawiera nazwę, autora, cenę, ocenę oraz przycisk "Dodaj do koszyka".
Po kliknięciu dodaje produkt do koszyka.
8. LogOutButton
Przycisk wylogowania, który wylogowuje użytkownika i nawigować go z powrotem do strony głównej.

Front-end -> Hooki:

1. Hook useFetchOrders
Ten hook jest odpowiedzialny za pobieranie danych zamówień użytkownika z API. Działa on na podstawie identyfikatora użytkownika (przekazywanego jako argument userId) i umożliwia:

Pobieranie zamówień: Kiedy userId jest dostępny, hook uruchamia zapytanie do serwera, aby pobrać listę zamówień.
Zarządzanie stanem: Hook przechowuje dane zamówień, stan ładowania (czy dane są w trakcie pobierania) oraz ewentualne błędy.
Obsługa błędów: W przypadku niepowodzenia (np. brak odpowiedzi z serwera lub błędne dane) hook ustawia odpowiedni komunikat o błędzie.
Działanie:

useState jest używany do przechowywania trzech stanów: zamówień (orders), statusu ładowania (loading) oraz ewentualnych błędów (error).
useEffect jest uruchamiany po każdej zmianie userId, co sprawia, że zapytanie jest wysyłane do serwera za każdym razem, gdy ten identyfikator się zmienia. Po pobraniu danych, stan komponentu jest aktualizowany, co powoduje renderowanie komponentu z nowymi danymi lub informacją o błędzie.
Uzasadnienie użycia:

Pobieranie danych na podstawie zmiennej: Dzięki useEffect hook jest w stanie dynamicznie reagować na zmiany userId, co pozwala na elastyczne pobieranie zamówień dla różnych użytkowników.
Zarządzanie stanem aplikacji: useState ułatwia zarządzanie i śledzenie różnych stanów komponentu, takich jak dane, status ładowania i ewentualne błędy.
2. Hook useFetchProducts
Ten hook ma na celu pobieranie listy produktów z serwera. Działa on bezpośrednio po załadowaniu komponentu, ponieważ nie wymaga żadnych zależności zewnętrznych (np. argumentów). Podobnie jak w przypadku useFetchOrders, hook obsługuje:

Pobieranie danych: Hook wysyła zapytanie HTTP do serwera, aby pobrać listę produktów.
Zarządzanie stanem: Przechowuje dane produktów, stan ładowania i błędy, podobnie jak w poprzednim przypadku.
Modyfikacja danych: Po otrzymaniu danych z serwera, hook aktualizuje dane produktów, łącząc imiona i nazwiska autorów w jedno pole authorName.
Działanie:

useState przechowuje trzy stany: listę produktów (products), status ładowania (loading) oraz błędy (error).
useEffect działa tylko raz, po pierwszym renderze komponentu, ponieważ lista produktów nie zależy od żadnych zewnętrznych zmiennych (czyli tablica zależności jest pusta). Po pobraniu danych, produkty są odpowiednio przetwarzane (łączenie imienia i nazwiska autora) i przechowywane w stanie.
Uzasadnienie użycia:

Pobieranie danych na starcie: Ponieważ lista produktów jest statyczna (nie zależy od żadnych zewnętrznych parametrów), useEffect jest wywoływany tylko raz, co pozwala na efektywne pobieranie danych tylko raz, gdy komponent jest pierwszy raz renderowany.
Przetwarzanie danych: useState umożliwia przechowywanie zmodyfikowanych danych (w tym przypadku połączenie imienia i nazwiska autora), co pozwala na ich późniejsze wykorzystanie w aplikacji.

Front-end -> Pages: 

1. Strona Home
Strona "Home" jest głównym ekranem aplikacji, który prezentuje użytkownikowi produkty dostępne w sklepie. Obejmuje funkcje związane z interakcją użytkownika z koszykiem, takim jak dodawanie produktów do koszyka oraz zarządzanie jego widocznością.

Stan lokalny:
cartItems: Przechowuje produkty w koszyku użytkownika.
isCartVisible: Określa, czy koszyk jest widoczny, czy nie.
Logika komponentu:
Dodawanie do koszyka: Użytkownik może dodać produkt do koszyka. Jeśli produkt jest już w koszyku, jego ilość zostanie zwiększona.
Usuwanie z koszyka: Użytkownik może usunąć produkt z koszyka, co prowadzi do usunięcia go ze stanu.
Zarządzanie widocznością koszyka: Użytkownik może włączać i wyłączać widoczność koszyka poprzez przycisk.
Hooki:
useFetchProducts: Hook służący do pobierania listy produktów z serwera. Pobiera dane o produktach, takie jak nazwa, cena, autor, itp.
Błędy i ładowanie:
Strona obsługuje stany ładowania (pokazując komunikat "Loading...") oraz ewentualne błędy w przypadku niepowodzenia pobierania produktów (wyświetlany komunikat o błędzie).
Interfejs:
Użytkownik widzi produkty w formie kafelków (komponent ProductTile), a także ma możliwość włączenia widoku koszyka.
2. Strona Layout
Strona "Layout" jest odpowiedzialna za strukturę nawigacyjną oraz obsługę autentykacji użytkownika. Zarządza sesją użytkownika oraz decyduje o wyświetlaniu odpowiednich przycisków logowania i wylogowywania.

Stan lokalny:

isLoggedIn: Określa, czy użytkownik jest zalogowany.
userData: Przechowuje dane użytkownika (np. login).
isPopupOpen: Określa, czy popup z formularzem logowania jest otwarty.
Logika komponentu:

Zarządzanie stanem użytkownika: Przechowuje informacje o użytkowniku w localStorage, dzięki czemu sesja jest zachowywana pomiędzy przeładowaniami strony.
Logowanie i wylogowanie: Obsługuje logowanie (zapisywanie danych użytkownika w stanie) oraz wylogowanie (czyszczenie danych użytkownika i przekierowanie na stronę główną).
Hooki:

useNavigate: Używane do nawigowania między stronami (np. po zalogowaniu użytkownika).
Nawigacja:

Strona umożliwia nawigację między różnymi sekcjami aplikacji za pomocą przycisków, takich jak "Home".
Popup logowania:

Po kliknięciu przycisku logowania, wyświetlany jest popup z formularzem logowania, który pozwala użytkownikowi na wpisanie danych i zalogowanie się.
3. Strona MyProfile
Strona "MyProfile" wyświetla profil użytkownika oraz informacje o jego zamówieniach. Jest to przestrzeń dla zalogowanego użytkownika, w której może on przeglądać swoje dane oraz historię zamówień.

Stan lokalny:
userData: Przechowuje dane użytkownika, w tym login i hasło (w prawdziwej aplikacji hasło nie powinno być wyświetlane).
Logika komponentu:
Pobieranie danych użytkownika: Dane użytkownika są pobierane z localStorage podczas pierwszego renderowania komponentu (hook useEffect).
Pobieranie zamówień: Za pomocą hooka useFetchOrders pobierane są zamówienia użytkownika, jeśli jest on zalogowany.
Hooki:
useFetchOrders: Hook odpowiada za pobranie zamówień użytkownika z serwera na podstawie jego identyfikatora.
Błędy i ładowanie:
Strona obsługuje stany ładowania oraz błędów w trakcie pobierania danych użytkownika i zamówień.
Wyświetlanie danych:
Użytkownik widzi swoje dane, takie jak login, oraz historię zamówień. W przypadku braku zamówień, wyświetlana jest odpowiednia informacja ("No orders found").
