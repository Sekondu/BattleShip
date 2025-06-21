let {GameBoard,Ships}=require('./script');
let testing=new GameBoard();
let ship2=new Ships();
test('Working',()=>
{
    expect(testing.get_coordinates(`${'A'}${1}`)).toBe(null);
    testing.place_ship(ship2,`A`,1);
    expect(testing.place_ship(ship2,'Y',10)).toBe(null);
    expect(testing.get_coordinates(`${'A'}${1}`)).toBe("occupied");
    expect(testing.get_coordinates(`${`A`}${2}`)).toBe(null);
    expect(testing.get_coordinates(`${'B'}${1}`)).toBe("occupied");
    expect(testing.recieved_attack(`${`A`}${1}`)).toBe("hit");
    expect(testing.recieved_attack(`${`B`}${1}`)).toBe("hit");
    expect(testing.recieved_attack(`${`C`}${1}`)).toBe("hit");
    expect(testing.recieved_attack(`${'A'}${5}`)).toBe("miss");
    expect(ship2.hits).toBe(3);
})
