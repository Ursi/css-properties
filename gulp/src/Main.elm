module Main exposing (..)

import Browser exposing (Document)
import Browser.Dom as Dom
import Browser.Events as BE
import Css as C exposing (Em, Style)
import Css.Colors exposing (..)
import Html.Styled as H exposing (Html)
import Html.Styled.Attributes as A
import Html.Styled.Events as E
import Http
import Json.Decode as D
import Process exposing (Id)
import Task exposing (Task)


main : Program () Model Msg
main =
    Browser.document
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }



-- MODEL


type alias Model =
    { properties : Maybe (List Property)
    , search : String
    , pid : Maybe Id
    , showingHelp : Bool
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { properties = Nothing
      , search = ""
      , pid = Nothing
      , showingHelp = False
      }
    , Http.get
        { url = "https://runkit.io/ursi/css-properties/branches/master"
        , expect =
            D.map4 Property
                (D.field "property" D.string)
                (D.field "title" D.string)
                (D.field "url" D.string)
                (D.field "status" D.string)
                |> D.list
                |> D.map
                    ((::)
                        { property = "pointer-events"
                        , title = "Scalable Vector Graphics 2"
                        , url = "https://svgwg.org/svg2-draft/interact.html#PointerEventsProp"
                        , status = ""
                        }
                        >> List.filter (\{ status } -> status /= "ED" && status /= "NOTE")
                        >> List.sortBy .property
                    )
                |> Http.expectJson PropertiesReceived
        }
    )


type alias Property =
    { property : String
    , title : String
    , url : String
    , status : String
    }



-- UPDATE


type Msg
    = PropertiesReceived (Result Http.Error (List Property))
    | CharacterPressed String
    | PidReceived Id
    | ResetSearch
    | ShowHelp
    | HideHelp
    | NoOp


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        HideHelp ->
            ( { model | showingHelp = False }, Cmd.none )

        ShowHelp ->
            ( { model | showingHelp = True }, Cmd.none )

        ResetSearch ->
            ( { model | search = "" }, Cmd.none )

        PidReceived id ->
            ( { model | pid = Just id }
            , Task.perform (\_ -> ResetSearch) resetSearchTimer
            )

        CharacterPressed char ->
            let
                currentSearch =
                    model.search ++ char
            in
            ( { model | search = currentSearch }
            , case model.properties of
                Just properties ->
                    Cmd.batch
                        [ match currentSearch properties
                            |> Dom.getElement
                            |> Task.map (.element >> .y)
                            |> Task.andThen (Dom.setViewport 0)
                            |> Task.attempt (\_ -> NoOp)
                        , (case model.pid of
                            Just pid ->
                                Process.kill pid
                                    |> Task.andThen (\_ -> Process.spawn resetSearchTimer)

                            Nothing ->
                                Process.spawn resetSearchTimer
                          )
                            |> Task.perform PidReceived
                        ]

                Nothing ->
                    Cmd.none
            )

        PropertiesReceived result ->
            case result of
                Ok properties ->
                    ( { model | properties = Just properties }, Cmd.none )

                Err _ ->
                    ( model, Cmd.none )

        NoOp ->
            ( model, Cmd.none )


match : String -> List Property -> String
match search properties =
    case properties of
        first :: rest ->
            if String.startsWith search first.property then
                first.property

            else
                match search rest

        [] ->
            ""


resetSearchTimer : Task x ()
resetSearchTimer =
    Process.sleep 1000



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    BE.onKeyDown
        (D.field "key" D.string
            |> D.andThen
                (\key ->
                    if String.length key == 1 then
                        D.succeed <|
                            CharacterPressed <|
                                if key == " " then
                                    "-"

                                else
                                    key

                    else
                        D.fail "not a character"
                )
        )



-- VIEW


view : Model -> Document Msg
view model =
    { title = ""
    , body =
        (case model.properties of
            Just list ->
                [ if model.showingHelp == True then
                    H.div
                        [ E.onMouseLeave HideHelp
                        , A.css
                            [ C.backgroundColor C.inherit
                            , helpPlacement
                            , C.padding <| C.rem 1
                            , C.border3 (C.px 1) C.solid black
                            ]
                        ]
                        [ H.text "Start typing to search the page."
                        , H.br [] []
                        , H.kbd [] [ H.text "Space" ]
                        , H.text " is intpreted as "
                        , H.kbd [] [ H.text "-" ]
                        , H.text " for convenience."
                        ]

                  else
                    H.div
                        [ E.onMouseEnter ShowHelp
                        , A.css
                            [ C.width helpIconSize
                            , C.height helpIconSize
                            , C.borderRadius helpIconSize
                            , helpPlacement
                            , C.border3 (C.px 1) C.solid black
                            , doubleCenter
                            ]
                        ]
                        [ H.text "?" ]
                , H.table
                    [ A.css
                        [ C.borderCollapse C.collapse
                        , C.margin4
                            (C.em 1)
                            C.auto
                            (C.vh 100)
                            C.auto
                        , C.paddingBottom <| C.vh 100
                        ]
                    ]
                    [ H.tbody [] <|
                        List.map
                            (\{ property, title, url, status } ->
                                H.tr [ A.id <| property ]
                                    [ td [ H.text property ]
                                    , td [ H.a [ A.href url ] [ H.text title ] ]
                                    , td [ H.text status ]
                                    ]
                            )
                            list
                    ]
                ]

            Nothing ->
                [ H.div
                    [ A.css
                        [ C.height <| C.vh 100
                        , doubleCenter
                        ]
                    ]
                    [ H.node "disk-loader" [ A.attribute "size" "3rem" ] [] ]
                ]
        )
            |> List.map H.toUnstyled
    }


helpPlacement : Style
helpPlacement =
    C.batch
        [ C.position C.fixed
        , C.top <| C.rem 1
        , C.left <| C.rem 1
        ]


helpIconSize : Em
helpIconSize =
    C.em 1.2


doubleCenter : Style
doubleCenter =
    C.batch
        [ C.displayFlex
        , C.justifyContent C.center
        , C.alignItems C.center
        ]


td : List (Html Msg) -> Html Msg
td =
    H.td
        [ A.css
            [ C.border2 (C.px 1) C.solid
            , C.padding <| C.em 0.5
            ]
        ]
