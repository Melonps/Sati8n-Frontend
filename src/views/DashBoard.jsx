import AreaGraph from "../components/ShowLineChart";
import MealSum from "../components/MealSum";
import NutrientPentagon from "../components/NutrientPentagon";
import RecordList from "../components/RecordList";
import StoryComponent from "../components/Story";

const data = [
    {
        date: "2021-09-01",
        time: "8:00",
        calory: 500,
        mealtype: "朝食",
        name: "シリアルと牛乳",
        restaurant: null,
        imageurl:
            "https://domani.shogakukan.co.jp/wp-content/uploads/2019/08/shutterstock_326452982.jpg",
        nutrients: {
            protein: 10,
            carbohydrates: 45,
            vitamins: 8,
            minerals: 5,
        },
    },
    {
        date: "2021-09-01",
        time: "10:00",
        calory: 0,
        mealtype: "軽食",
        name: "グリーンティー",
        restaurant: null,
        imageurl:
            "https://onoen.jp/wp-content/uploads/2020/04/ryokucha_img-1170x780.jpg",
        nutrients: {
            vitamins: 2,
        },
    },
    {
        date: "2021-09-01",
        time: "12:00",
        calory: 200,
        mealtype: "昼食",
        name: "チキンサラダと全粒パン",
        restaurant: "サブウェイ",
        nutrients: {
            protein: 20,
            carbohydrates: 30,
            fats: 10,
            vitamins: 6,
        },
    },
    {
        date: "2021-09-01",
        time: "15:00",
        calory: 150,
        mealtype: "軽食",
        name: "ヨーグルトと果物",
        restaurant: null,
        nutrients: {
            protein: 5,
            carbohydrates: 25,
            fats: 2,
            fiber: 3,
            vitamins: 5,
            minerals: 4,
        },
    },
];

function DashBoard() {
    return (
        <div className="w-full">
            <StoryComponent />
            <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex justify-center">
                    <MealSum goalCalories={2000} data={data} />
                </div>
                <div className="flex justify-center">
                    <NutrientPentagon nutrients={nutrients} />
                </div>
            </div>
            <div className="flex justify-center">
                <AreaGraph data={data} />
            </div>
            <RecordList data={data} />
        </div>
    );
}
export default DashBoard;

const nutrients = {
    Protein: 60,
    Carbohydrates: 40,
    Fat: 30,
    Vitamins: 50,
    Minerals: 70,
};
